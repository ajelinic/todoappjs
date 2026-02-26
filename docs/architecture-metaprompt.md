# TodoAppJS Architecture Metaprompt

Use this metaprompt as a default constraint for all feature work and refactors.

## Core Goal
Build and evolve the app with strict separation of concerns, using a layered architecture where frontend orchestration is separated from backend logic, and the `Client` layer is the only middleware between them.

## Non-Negotiable Rules
1. Apply SOLID and Clean Code consistently across the whole codebase.
2. SRP: each class/module has one clear reason to change.
3. OCP: extend behavior via composition/plugins/new classes, avoid breaking edits in stable modules.
4. LSP: derived/alternative implementations must preserve base contracts and runtime expectations.
5. ISP: prefer small focused interfaces/contracts over fat multi-purpose APIs.
6. DIP: high-level modules depend on abstractions (clients/facades/contracts), not concrete storage or DOM details.
7. Keep naming, function size, and module boundaries aligned with Clean Code (clarity over cleverness).
8. Avoid hidden coupling, side effects, and mixed responsibilities in a single unit.
9. Presentation controllers handle UI orchestration only; they must not contain business rules.
10. Displayable features may have their own presentation controllers.
11. Data-only features must not have presentation controllers.
12. `IndexController` is the composition root, not a feature-logic container.
13. Feature UI behavior should live in feature presentation controllers (for example `TaskController`), then delegate through clients.
14. Presentation must call business only through `Client` classes.
15. Business layer contains use cases, validation, and decisions; no DOM/UI code.
16. Persistence layer contains repositories/gateways and storage mapping; no business decisions.
17. `Storage` bundle remains generic and abstract (no task/glossary-specific rules in storage internals).

## Layer Contract
- `Presentation -> Client -> Business -> Persistence -> Storage`
- Allowed communication is top-to-bottom through these contracts.
- No direct `Presentation -> Business` or `Presentation -> Persistence` calls.

## Target State for This Project
- Keep `IndexController` thin and orchestration-focused.
- Move task-specific UI behavior out of `IndexController` into `TaskController`.
- Keep `Glossary` as data/logic-only unless it gains standalone UI requirements.
- Continue refactors in small reversible steps with runtime stability checks.

## Refactor Checklist (Use Per PR/Work Block)
- Did this change satisfy SOLID (SRP/OCP/LSP/ISP/DIP) and Clean Code constraints?
- Did any controller gain non-UI business logic?
- Did presentation bypass clients?
- Did storage become feature-coupled?
- Is `IndexController` thinner than before?
- Was logic moved toward feature-specific controllers/services?
