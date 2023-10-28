import "./style.css";

import { z } from "zod";

//example of normal type delcaration for typescirpt
// type City = {
//   name: string
// }

const citySchema = z.object({
  name: z.string(), // string
  population: z.number().gt(0), // number and greater than 0
  area: z.string().min(5), //min length
  rating: z.string().optional(), //optional stuff
});

type City = z.infer<typeof citySchema>; // creating the type from z schema 

const city = {
  name: "Castelo Branco",
  population: 177912,
  area: "1 438 km²",
} as City;

console.log(citySchema.parse(city));

console.log(citySchema.safeParse(city)); //returns success

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Zod Learning</h1>
    <h3> City: ${city.name}</h3>
    <ul>
      <li>Population: ${city.population}</li>
      <li>Area: ${city.area}</li>
    </ul>
  </div>
`;
