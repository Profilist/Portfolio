/**
 * The Larris paper-bevel button recipe (outline variant, size md), as a class
 * string so it can style links as well as buttons. A vertical gradient one step
 * lighter on top, a 1px edge one step darker, a white inset highlight, and a
 * soft hue-tinted drop; hover brightens, press sinks 1px.
 * From ~/Projects/design/larris/src/components/ui/button.tsx.
 */
export const bevelButton = [
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap select-none",
  "h-8 rounded-md px-[9px] text-[11.5px] font-semibold tracking-[-0.005em]",
  "transition-[filter,box-shadow,transform] duration-fast ease-out",
  "[--btn-fill:linear-gradient(180deg,var(--v-surface),var(--v-surface-2))] [--btn-edge:var(--v-line-strong)] [--btn-shadow:rgb(var(--v-shadow-ink)/0.10)]",
  "[background:var(--btn-fill)] [border:1px_solid_var(--btn-edge)] text-ink",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_2px_3px_var(--btn-shadow)]",
  "hover:brightness-[1.06] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.32),0_3px_5px_var(--btn-shadow)]",
  "active:translate-y-px active:brightness-100 active:shadow-[inset_0_1px_2px_var(--btn-shadow)]",
  "pointer-coarse:h-11 pointer-coarse:px-4",
  "[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
].join(" ");
