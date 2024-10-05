# Workday Condition Rules Style Guide

## Introduction
This style guide outlines the best practices and conventions for writing condition rules in Workday. Following these guidelines will help ensure consistency and clarity in your condition rules.

## General Guidelines
- **Clarity**: Write condition rules that are easy to understand.
- **Consistency**: Use consistent naming conventions and formatting.
- **Simplicity**: Keep condition rules as simple as possible.

## Naming Conventions
- **Variables**: Use camelCase for variable names (e.g., `employeeStatus`).
- **Functions**: Use PascalCase for function names (e.g., `IsActiveEmployee`).
- **Constants**: Use UPPERCASE for constants (e.g., `MAX_HOURS`).

## Formatting
- **Indentation**: Use 4 spaces for indentation.
- **Line Length**: Limit lines to 80 characters.
- **Spacing**: Use a single space after commas and around operators.

## Comments
- **Single-line Comments**: Use `//` for single-line comments.
- **Multi-line Comments**: Use `/* ... */` for multi-line comments.
- **Comment Clarity**: Ensure comments are clear and concise.

## Example
```markdown
// Check if the employee is active
IsActiveEmployee(employeeStatus) {
    if (employeeStatus == "Active") {
        return true;
    } else {
        return false;
    }
}
```

## Best Practices
- **Avoid Hardcoding**: Use variables and constants instead of hardcoding values.
- **Error Handling**: Include error handling to manage unexpected conditions.
- **Testing**: Thoroughly test condition rules to ensure they work as expected.

## Conclusion
Adhering to this style guide will help maintain high-quality and consistent condition rules in Workday. Regularly review and update your rules to align with these guidelines.
