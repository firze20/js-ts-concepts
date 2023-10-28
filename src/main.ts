import './style.css'

import { z } from "zod";

//example of normal type delcaration for typescirpt
// type City = {
//   name: string
// }

const citySchema = z.object({
  name: z.string(), // string
  population: z.number(), // number
  area: z.string().min(5), //min length
});

type City = z.infer<typeof citySchema>;

const city = { name: "Castelo Branco", population: 177912, area: "1 438 km²" } as City;

console.log(citySchema.parse(city));

console.log(citySchema.safeParse(city)); //returns success

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Zod Learning</h1>
    <h3> City: ${city.name}</h3>
    <ul>
      <li>Population: ${city.population}</li>
      <li>Area: ${city.area}</li>
    </ul>
  </div>
`

