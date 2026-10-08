import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Local vector illustrations are intentional placeholders, not product photographs.
const palette = {
  casa: ["#e9e1d3", "#a4aa8c", "#ded0b9"],
  difusores: ["#eee7db", "#979b7c", "#bca58a"],
  sprays: ["#eee3d5", "#a3aa91", "#c8aa8b"],
  "agua-de-lencois": ["#ece9df", "#b4b7a0", "#ded5c5"],
  figo: ["#e2e3d2", "#777e5c", "#705961"],
  pitanga: ["#eee0cc", "#939779", "#b97252"],
  jabuticaba: ["#e4dcd6", "#8a8c70", "#514653"],
  "laranja-lima": ["#eee8ca", "#a5a66e", "#d2ae57"],
};
for (const [kind, [bg, leaf, accent]] of Object.entries(palette)) {
  const fruit = ["figo", "pitanga", "jabuticaba", "laranja-lima"].includes(kind);
  const shapes = fruit
    ? '<path d="M680 620C740 450 785 300 830 190" stroke="' + leaf + '" stroke-width="9" fill="none"/><path d="M756 418Q554 390 615 235Q790 247 756 418M803 288Q882 158 1018 182Q1002 346 803 288" fill="' + leaf + '"/><ellipse cx="565" cy="642" rx="130" ry="23" fill="#5e5146" opacity=".12"/><circle cx="550" cy="550" r="98" fill="' + accent + '"/><circle cx="693" cy="588" r="77" fill="' + accent + '"/><path d="M502 490Q548 453 590 498" stroke="#fff" opacity=".18" stroke-width="18" fill="none"/><path d="M548 453L569 418M695 512L711 483" stroke="' + leaf + '" stroke-width="9" stroke-linecap="round"/>'
    : kind === "agua-de-lencois"
      ? '<path d="M260 450L766 355L988 527L467 646Z" fill="#faf7ed"/><path d="M260 450L467 646L467 726L260 532Z" fill="#d0c5b4"/><path d="M467 646L988 527L988 607L467 726Z" fill="#e1d8c7"/><path d="M305 440L810 400M348 480L855 440M385 522L900 480" stroke="#d9cbbb" stroke-width="3"/><path d="M686 436Q692 300 824 246" stroke="' + leaf + '" stroke-width="6" fill="none"/><path d="M754 324Q703 207 795 184Q851 260 754 324M785 285Q897 194 935 284Q882 349 785 285" fill="' + leaf + '"/>'
      : '<ellipse cx="658" cy="740" rx="323" ry="39" fill="#8d806a" opacity=".15"/><path d="M359 572L845 502L1048 645L554 739Z" fill="#f4ecdf"/><path d="M359 572L554 739L554 900L359 900Z" fill="#c9b89d"/><path d="M554 739L1048 645L1048 900L554 900Z" fill="#deceb5"/><path d="M567 457C529 510 535 616 593 630L704 630C764 612 761 510 726 457L704 389L589 389Z" fill="' + accent + '"/><ellipse cx="646" cy="390" rx="58" ry="17" fill="#8a7863"/><path d="M647 391Q632 212 783 126M647 344Q513 278 467 142" stroke="' + leaf + '" stroke-width="7" fill="none"/><path d="M690 245Q665 115 779 91Q815 194 690 245M618 311Q492 320 474 207Q590 186 618 311M742 191Q839 99 908 176Q843 278 742 191" fill="' + leaf + '"/><path d="M425 667Q391 610 403 577L469 568Q495 606 486 650Z" fill="#f7f2e9"/><ellipse cx="436" cy="574" rx="34" ry="9" fill="#c2b19c"/>';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><defs><linearGradient id="wall" x2="1" y2="1"><stop stop-color="' + bg + '"/><stop offset="1" stop-color="#d7c9b2"/></linearGradient><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".045"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter></defs><g filter="url(#grain)"><path fill="url(#wall)" d="M0 0h1200v900H0z"/><path fill="#fff9e9" opacity=".38" d="M0 0H348L898 900H458Z"/><path fill="#fff9e9" opacity=".25" d="M385 0H443L995 900H938Z"/><path fill="#9f947c" opacity=".12" d="M0 746L1200 570V900H0Z"/>' + shapes + '</g></svg>';
  const dir = "public/images/blog/" + kind;
  await mkdir(dir, { recursive: true });
  await writeFile(dir + "/editorial.svg", svg);
}
const og = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#FAF8F4"/><rect x="32" y="32" width="1136" height="566" fill="none" stroke="#E5DED3"/><path d="M980 590Q865 366 1000 130M934 424Q797 400 793 295Q927 284 934 424M958 275Q1069 179 1112 250Q1088 346 958 275" fill="#dadac9" stroke="#a3a38a" stroke-width="3"/><text x="85" y="175" font-family="Georgia,serif" font-size="69" letter-spacing="15" fill="#342F2A">HANAMI</text><text x="91" y="219" font-family="Arial,sans-serif" font-size="18" letter-spacing="10" fill="#6F675F">JOURNAL</text><text x="85" y="345" font-family="Georgia,serif" font-size="54" fill="#342F2A">A casa também</text><text x="85" y="410" font-family="Georgia,serif" font-size="54" font-style="italic" fill="#817464">tem memória.</text><text x="90" y="527" font-family="Arial,sans-serif" font-size="18" fill="#6F675F">AROMAS PARA CASA · FRAGRÂNCIAS · PEQUENOS RITUAIS</text></svg>';
await writeFile("public/hanami-og.svg", og);
await sharp(Buffer.from(og)).png().toFile("public/hanami-og.png");
await writeFile("public/favicon.svg", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#FAF8F4"/><path d="M17 14h8v15h14V14h8v36h-8V35H25v15h-8z" fill="#817464"/></svg>');
console.log("Created eight local editorial placeholders, HANAMI OG image and favicon.");
