---
layout: post
title: "Network Stacks at the Edge: A Field Guide to Four Container Gateways"
---

Every public-facing service sits behind a network stack at the edge — Transport Layer Security (TLS) termination, authentication, rate limiting, circuit breakers, observability. The boring-but-load-bearing layer between the internet and your application code.

<amp-img width="1440" height="816" layout="responsive" src="/assets/images/hero.jpg" alt="Abstract distributed systems network"></amp-img>

You can build this yourself. You probably should not. Off-the-shelf gateways have been compounding capability for a decade.

I'd been building [`gateway-core`](https://github.com/dskow/gateway-core) — a side-project gateway — and wanted an honest answer to a question I kept dodging: where does it fit among the existing options, and which capabilities are already solved well enough that I should just use one of them instead? So I wrote a [reference doc](https://github.com/dskow/gateway-core/blob/main/docs/THIRD_PARTY_STACKS.md) comparing four mature container gateways against `gateway-core`. This post is the short version.

## What lives in an edge stack

<div style="background:#0a1628;border-radius:8px;padding:16px;margin:1.5em 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="width:100%;height:auto;font-family:system-ui,-apple-system,sans-serif;">
  <rect x="40" y="160" width="120" height="80" rx="8" fill="#1a2942" stroke="#5eead4" stroke-width="2"/>
  <text x="100" y="195" fill="#e0f2f1" text-anchor="middle" font-size="16" font-weight="600">Client</text>
  <text x="100" y="215" fill="#94a3b8" text-anchor="middle" font-size="11">Browser, app, API caller</text>

  <line x1="160" y1="200" x2="245" y2="200" stroke="#5eead4" stroke-width="2"/>
  <polygon points="240,195 250,200 240,205" fill="#5eead4"/>
  <text x="202" y="190" fill="#94a3b8" text-anchor="middle" font-size="11">HTTPS</text>

  <rect x="250" y="60" width="300" height="280" rx="10" fill="#0f1f3a" stroke="#5eead4" stroke-width="2"/>
  <text x="400" y="90" fill="#5eead4" text-anchor="middle" font-size="14" font-weight="600" letter-spacing="2">EDGE STACK</text>

  <rect x="270" y="105" width="260" height="38" rx="4" fill="#1e3a5f"/>
  <text x="400" y="129" fill="#e0f2f1" text-anchor="middle" font-size="13">TLS termination</text>

  <rect x="270" y="148" width="260" height="38" rx="4" fill="#1e3a5f"/>
  <text x="400" y="172" fill="#e0f2f1" text-anchor="middle" font-size="13">JWT / OIDC authentication</text>

  <rect x="270" y="191" width="260" height="38" rx="4" fill="#1e3a5f"/>
  <text x="400" y="215" fill="#e0f2f1" text-anchor="middle" font-size="13">Rate limiting</text>

  <rect x="270" y="234" width="260" height="38" rx="4" fill="#1e3a5f"/>
  <text x="400" y="258" fill="#e0f2f1" text-anchor="middle" font-size="13">Circuit breakers</text>

  <rect x="270" y="277" width="260" height="38" rx="4" fill="#1e3a5f"/>
  <text x="400" y="301" fill="#e0f2f1" text-anchor="middle" font-size="13">Reverse proxy + health checks</text>

  <line x1="550" y1="200" x2="635" y2="200" stroke="#5eead4" stroke-width="2"/>
  <polygon points="630,195 640,200 630,205" fill="#5eead4"/>
  <text x="592" y="190" fill="#94a3b8" text-anchor="middle" font-size="11">HTTP / gRPC</text>

  <rect x="640" y="120" width="120" height="50" rx="6" fill="#1a2942" stroke="#5eead4" stroke-width="1.5"/>
  <text x="700" y="150" fill="#e0f2f1" text-anchor="middle" font-size="13">users-svc</text>

  <rect x="640" y="180" width="120" height="50" rx="6" fill="#1a2942" stroke="#5eead4" stroke-width="1.5"/>
  <text x="700" y="210" fill="#e0f2f1" text-anchor="middle" font-size="13">orders-svc</text>

  <rect x="640" y="240" width="120" height="50" rx="6" fill="#1a2942" stroke="#5eead4" stroke-width="1.5"/>
  <text x="700" y="270" fill="#e0f2f1" text-anchor="middle" font-size="13">billing-svc</text>
</svg>
</div>

Same five concerns, different vendors. Acronyms below: JSON Web Token (JWT), OpenID Connect (OIDC), Service Level Objective (SLO).

## The four stacks at a glance

| Stack | Best at | Trade-off | In production at |
|---|---|---|---|
| **Apache APISIX** · [diagram ↗](https://github.com/dskow/gateway-core/blob/main/docs/THIRD_PARTY_STACKS.md#user-content-31-stack-a--apache-apisix-single-dataplane-container) | One container with everything — JWT, OIDC, rate limit, circuit breaker, Prometheus, OpenTelemetry | You now operate etcd | <img src="/assets/images/logos/wechat.svg" alt="WeChat (Tencent)" title="WeChat (Tencent)" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/bilibili.svg" alt="Bilibili" title="Bilibili" style="height:36px;vertical-align:middle;margin-right:14px;"> *also Airwallex, WPS Office* |
| **Envoy + adjuncts** · [diagram ↗](https://github.com/dskow/gateway-core/blob/main/docs/THIRD_PARTY_STACKS.md#user-content-32-stack-b--envoy--lyftratelimit--ext_authz-production-grade-composition) | Deepest production feature set: adaptive concurrency, a real shadow router, outlier detection | Four containers, non-trivial filter chain | <img src="/assets/images/logos/lyft.svg" alt="Lyft (origin)" title="Lyft — origin project" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/google.svg" alt="Google" title="Google" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/stripe.svg" alt="Stripe" title="Stripe" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/pinterest.svg" alt="Pinterest" title="Pinterest" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/reddit.svg" alt="Reddit" title="Reddit" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/istio.svg" alt="Istio data plane" title="Istio (data plane)" style="height:36px;vertical-align:middle;margin-right:14px;"> |
| **Traefik** · [diagram ↗](https://github.com/dskow/gateway-core/blob/main/docs/THIRD_PARTY_STACKS.md#user-content-33-stack-c--traefik--forward-auth-docker-native) | Docker-native — service discovery from labels, auto-TLS in one flag | Single-instance state; rate limit and breaker do not share across replicas | <img src="/assets/images/logos/rancher.svg" alt="Rancher" title="Rancher" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/kubernetes.svg" alt="K3s" title="K3s default ingress" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/docker.svg" alt="Self-hosted Docker" title="Self-hosted Docker / homelab" style="height:36px;vertical-align:middle;margin-right:14px;"> |
| **Kong DB-less** · [diagram ↗](https://github.com/dskow/gateway-core/blob/main/docs/THIRD_PARTY_STACKS.md#user-content-34-stack-d--kong-db-less) | Largest open-source plugin catalogue, declarative YAML hot-reloaded | No first-party circuit breaker plugin | <img src="/assets/images/logos/cisco.svg" alt="Cisco" title="Cisco" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/generalelectric.svg" alt="GE" title="GE" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/sap.svg" alt="SAP" title="SAP" style="height:36px;vertical-align:middle;margin-right:14px;"><img src="/assets/images/logos/expedia.svg" alt="Expedia" title="Expedia" style="height:36px;vertical-align:middle;margin-right:14px;"> *also Yahoo* |

A short heuristic:

- Already on Docker / Compose / Swarm → **Traefik**.
- Want one binary with everything → **APISIX**.
- Need adaptive concurrency, distributed rate limits, or a real shadow router → **Envoy**.
- Need the largest plugin catalogue → **Kong**.

The [reference doc](https://github.com/dskow/gateway-core/blob/main/docs/THIRD_PARTY_STACKS.md) has the full feature matrix, `docker-compose` sketches, and diagrams of how each stack wires together.

## Where the off-the-shelf path stops

There is a layer above the deterministic gateway that none of these ship: structured *gating* of configuration changes — code-level constraints, per-parameter bounded deltas, cooldown on a change source, mandatory shadow simulation that scores against SLOs and can veto a change.

That layer matters when something other than a human is writing the configuration. An agent that adjusts rate limits is useful; an agent that adjusts them *unsafely* is a liability. The four gateways treat configuration as configuration — there is no built-in contract that says "this knob may not move more than ±20% per window."

[`gateway-core`](https://github.com/dskow/gateway-core) is a side project studying what that contract looks like — an "Agentic Envelope" of constraints, bounds, dampener, and shadow simulator that any agent-driven change has to pass through. The four stacks above solve the deterministic half well. The second half is open territory.
