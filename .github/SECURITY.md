# 🛡️ Zenith PDF Document Management Platform Security Policy

Zenith PDF is committed to maintaining the highest level of security for our users. Given our architecture (Tauri/Client-Side), security efforts focus heavily on preventing supply chain attacks, minimizing system access, and isolating potential vulnerabilities in the underlying Rust core.

We appreciate the efforts of security researchers and the community in helping us achieve a **Zero-Defect** standard. This document outlines the process for reporting vulnerabilities and our commitment to responsible disclosure.

## 1. 🚨 Reporting a Vulnerability

If you discover a security vulnerability in Zenith PDF, please report it immediately and responsibly.

### Preferred Method

**DO NOT** open a public GitHub issue. Please report vulnerabilities privately via email to our dedicated Security Team:

📧 **security@zenith-pdf.io** (Placeholder)

We encourage encrypting your submission using our official PGP key (available upon request or listed in the repository settings).

### Information Required

To help us triage and resolve the issue quickly, please include:

1.  **A detailed description** of the vulnerability and its potential impact.
2.  **Steps to reproduce** the issue (including configuration details).
3.  The **affected version(s)** of Zenith PDF (e.g., `v1.2.0`).
4.  Any **proof-of-concept** code or scripts.
5.  Your name and affiliation (if desired) for proper credit.

---

## 2. ⏱️ Our Security Response Timeline (SLA)

We use the Common Vulnerability Scoring System (CVSS v3.1) to prioritize and rate vulnerabilities. Our commitment to response is as follows:

| Severity (CVSS) | Initial Acknowledgment | Triage & Assessment | Resolution Target |
| :--- | :--- | :--- | :--- |
| **Critical** (9.0–10.0) | < 2 Hours | < 24 Hours | < 7 Days |
| **High** (7.0–8.9) | < 4 Hours | < 48 Hours | < 14 Days |
| **Medium** (4.0–6.9) | < 1 Business Day | < 7 Days | < 30 Days |
| **Low** (0.1–3.9) | < 2 Business Days | < 14 Days | Next Scheduled Release |

*Note: Resolution targets depend on the complexity of the fix and required regression testing.*

## 3. 🔐 Development Security Principles (DevSecOps Protocol)

As dictated by the **Apex Technical Authority**, all development adheres to strict security protocols:

1.  **Zero Trust Architecture:** All inputs, whether from the local filesystem or the network, are treated as hostile and must be fully sanitized before processing.
2.  **Supply Chain Integrity:** We enforce automated dependency audits (`npm audit`, `cargo audit`) and generate **Software Bill of Materials (SBOMs)** for every release to ensure library provenance.
3.  **Tauri Isolation:** Strict configuration of the Tauri API to expose only minimal, necessary functionality to the webview, preventing OS-level escape vectors.
4.  **Client-Side Data Mandate:** Sensitive PDF data processing and storage are kept strictly client-side whenever possible, minimizing server risk (where applicable).
5.  **Principle of Least Privilege:** Components only access resources necessary for their specific function (DIP/ISP adherence).

## 4. ⚙️ Supported Versions

We prioritize security patches for the latest stable release and the previous minor release branch.

| Version | Supported | Notes |
| :--- | :--- | :--- |
| **Latest Stable (e.g., v2.x)** | ✅ Yes | Receives immediate critical and high-priority fixes. |
| **Previous Minor (e.g., v1.x)** | ⚠️ Limited | Only receives critical security fixes for 6 months after the latest stable release. |
| **Older Versions** | ❌ No | Users must upgrade to receive support. |

We highly recommend always using the latest version of Zenith PDF to benefit from the newest security enhancements and bug fixes.

---

## 5. Thank You

We extend our sincere gratitude to all individuals who contribute to the security of the Zenith PDF platform through responsible disclosure.