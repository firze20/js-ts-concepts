import './style.css'

import { z } from "zod";

const citySchema = z.object({
  name: z.string(),
});

const lisbon = { name: "Lisbon" };

console.log(citySchema.parse(lisbon));

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Zod</h1>
  </div>
`

