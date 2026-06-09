## Summary
Split the combined `machine` string into two separate HubSpot fields while leaving the EmailJS submission and visible form unchanged.

## Details
In `src/components/RequestInfoForm.tsx`, inside the `submitToHubspot` function:

1. Before building the `map` array, split `formData.machine` on `" + "` (space-plus-space):
   - `const separator = " + ";`
   - `const machineValue = formData.machine;`
   - `const splitIndex = machineValue.indexOf(separator);`

2. Determine the two values:
   - If `splitIndex !== -1`:
     - `machine_of_interest = machineValue.slice(0, splitIndex)`
     - `accessories_selected = machineValue.slice(splitIndex + separator.length)`
   - Else:
     - `machine_of_interest = machineValue`
     - `accessories_selected = "None"`

3. Update the `map` array so that:
   - `machine_of_interest` maps to the computed `machine_of_interest` value
   - Add a new entry `accessories_selected` mapping to the computed `accessories_selected` value

## What stays the same
- `emailVars` and both `emailjs.send` calls continue to use `formData.machine` (the full combined string).
- No visible form field changes.
- No other submission logic changes.

## Acceptance criteria
- Machine + accessories → HubSpot: `Machine of Interest` = machine model, `Accessories Selected` = accessories.
- Machine only → HubSpot: `Machine of Interest` = machine model, `Accessories Selected` = "None".
- EmailJS email still shows the full combined string.
- No console errors.