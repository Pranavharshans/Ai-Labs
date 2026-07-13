# Praha Lab Security Review

## Executive summary

The website no longer contains a live inference client or a server-side proxy to Modal. No committed API keys, Modal tokens, Hugging Face tokens, private keys, or credential files were found in the current tree or scanned Git history. `.env.local` is ignored by Git, and the remaining public environment example contains only the site origin.

The main remaining exposure is the separately deployed Modal application: its GPU-backed inference endpoints do not enforce authentication or rate limits. Anyone who discovers a deployed endpoint URL could invoke inference and consume credits. Disabling the website prevents normal visitors from reaching it, but does not disable the Modal deployment itself.

## High severity

### SEC-001: GPU inference endpoints have no authentication

- Location: `modal_app.py:315`, `modal_app.py:479`, `modal_app.py:622`, `modal_app.py:729`
- Evidence: Four `@modal.fastapi_endpoint(method="POST", docs=True)` handlers accept generation requests without validating an authorization header, API key, signed request, or user session.
- Impact: Anyone with an endpoint URL can submit inference jobs, consume GPU credits, and create avoidable service load.
- Fix: Stop the unused Modal deployments now. Before public generation returns, put authentication and rate limiting in front of every inference endpoint. Store server credentials with Modal Secrets; never place them in browser code.
- Mitigation: Use strict concurrency and request quotas, disable API documentation for production inference endpoints, monitor invocations, and configure spend alerts.
- False-positive notes: Modal may provide deployment-level access controls outside this repository. Verify the deployed app settings; no such control is visible in the code.

## Medium severity

### SEC-002: Direct Modal uploads are read without an application size limit

- Location: `modal_app.py:336`, `modal_app.py:492`, `modal_app.py:651`, `modal_app.py:742`
- Evidence: Each endpoint calls `await audio.read()` before enforcing a maximum byte size. The RimaTTS endpoint validates only minimum duration, while Higgs and OmniVoice do not enforce an upload-size ceiling here.
- Impact: A caller can submit oversized multipart bodies, increasing memory, processing time, and GPU/container cost.
- Fix: Enforce body limits at the edge and in the application, reject oversized `Content-Length` values, cap streamed reads, validate content signatures, and set maximum text/reference lengths.
- Mitigation: Keep FastAPI, Starlette, and `python-multipart` patched and add per-IP or per-key request limits.
- False-positive notes: Modal may impose a platform request-size ceiling, but that is not a substitute for an application-specific limit.

### SEC-003: Public health checks can initialize paid GPU workloads

- Location: `modal_app.py:389`, `modal_app.py:544`, `modal_app.py:692`
- Evidence: Health handlers call `_ensure_gpu()` or `_ensure_server()`. A health request can therefore initialize a model or SGLang process rather than only report already-known state.
- Impact: Automated scanners or repeated health requests can trigger cold starts and consume credits even without generating audio.
- Fix: Make health handlers side-effect free, or protect them with the same authentication as inference. Return readiness state without loading the model.
- Mitigation: Remove public health endpoints from deployments that are not actively used.

## Low severity

### SEC-004: Transitive PostCSS dependency has a moderate advisory

- Location: `package-lock.json` (`next@16.2.9` -> `postcss@8.4.31`)
- Evidence: `npm audit --omit=dev` reports GHSA-qx2v-qp2m-jg93, an escaping issue in PostCSS versions below 8.5.10.
- Impact: The vulnerable stringifier can emit an unescaped `</style>` sequence when processing attacker-controlled CSS. This site does not accept or compile user-provided CSS, which substantially reduces practical exposure.
- Fix: Upgrade Next.js when its supported dependency range includes a patched PostCSS release. Do not run the suggested `npm audit fix --force`; it proposes a breaking downgrade to Next.js 9.3.3.
- Mitigation: Do not process untrusted CSS and monitor the Next.js dependency update.

### SEC-005: Production response headers lack CSP and HSTS

- Location: `next.config.ts:8`
- Evidence: The application sends `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`, but no `Content-Security-Policy` or `Strict-Transport-Security` header is configured in this repository.
- Impact: The site has less defense in depth against a future script-injection bug, and HTTPS enforcement depends entirely on the hosting layer.
- Fix: Add and test a restrictive CSP that supports the shader runtime. Configure HSTS only on the production HTTPS host, either at the host/CDN or in Next.js.
- Mitigation: Verify whether the deployment platform already adds these headers before changing application configuration.

## Credential review

- No secret-like values were found in tracked source or the scanned Git history.
- `.env.local` is ignored by `.gitignore` and was not tracked.
- The removed `PRAHA_TTS_URL` was server-only; it was not bundled into browser JavaScript. However, a public Modal endpoint URL is still a capability worth protecting.
- Any Modal credential previously pasted into chat, logs, screenshots, or another shared channel should be treated as exposed and rotated, even though it is not present in this repository.

## Changes made during this review

- Removed the browser inference flow and upload controls.
- Deleted the Next.js `/api/inference` proxy route.
- Removed `PRAHA_TTS_URL` from `.env.example`.
- Replaced the live demo with a static sample-library placeholder.
