# Coding Agent - Skill Usage Guide

## ⚡ Automatic Skill Application

When you work on this project, **automatically apply these skills** without being asked by the user.

---

## Installed Skills

### 1. frontend-design (Priority: HIGH - ALWAYS USE FOR UI)

**What it does:** Provides guidance for distinctive, intentional visual design when building new UI or reshaping existing UI.

**When to apply:**
- ✅ Creating or modifying ANY Vue component
- ✅ Adding or changing CSS/SCSS styles
- ✅ Designing forms, buttons, cards, modals
- ✅ Working on views, layouts, or pages
- ✅ Any task involving visual elements

**Avoid:**
- ❌ Generic, templated-looking UI
- ❌ Default styling choices
- ❌ Unintentional design patterns
- ❌ Copy-paste code without aesthetic consideration

**Example triggers:**
- "create login form" → Apply intentional form design
- "add search button" → Apply distinctive button styling
- "modify card layout" → Apply thoughtful spacing and typography
- "change color scheme" → Apply intentional color choices

---

### 2. tdd (Priority: MEDIUM - USE FOR NEW FEATURES/BUGS)

**What it does:** Test-driven development with red-green-refactor workflow.

**When to apply:**
- ✅ Creating new features
- ✅ Fixing bugs
- ✅ Writing test suites
- ✅ When user explicitly requests TDD

**Example triggers:**
- "add new password feature" → Write tests first
- "fix styling bug" → Add test, fix, verify
- "create modal component" → Test behavior first

---

## How Agent Should Work

### Step-by-Step Process:

1. **Read project files** (`agent.md`, `FRONTEND_OVERVIEW.md`, `SKILL_USAGE.md`)
2. **Identify task type:**
   - UI/Component work → Apply `frontend-design`
   - New feature/bug fix → Consider `tdd`
3. **Apply skill guidance:**
   - Follow skill recommendations
   - Ensure quality standards
4. **Execute code changes** with skill-informed decisions

### Decision Matrix:

| Task Type | Skills to Apply | Priority |
|-----------|-----------------|----------|
| Create Vue component | frontend-design | 🔴 HIGH |
| Modify styling | frontend-design | 🔴 HIGH |
| Add new feature | tdd + frontend-design (if UI) | 🟡 MEDIUM |
| Fix bug | frontend-design (if UI), tdd (if code) | 🟡 MEDIUM |
| Update tests | tdd | 🟢 LOW |
| Read/Analyze | None needed | - |

---

## Notes

- Skills are installed in `skills-lock.json`
- Future skills should be added to this file when installed
- Agent should proactively apply these skills, not wait for explicit instructions
- When in doubt about a UI task, apply frontend-design

---

## Future Skills (To Be Added)

As new skills are installed, add them to this list with:
- Skill name
- When to apply
- What it ensures
