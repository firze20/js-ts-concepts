import "./style.css";

import { z } from "zod";

//example of normal type delcaration for typescirpt
// type City = {
//   name: string
// }

enum Activities {
  Football = "Football",
  Library = "Library", 
  Hiking = "Hiking",
  Disco = "Disco",
  Concerts = "Concerts"
}

// another way

const activities = ["Football", "Library", "Hiking", "Camping", "Disco", "Concerts"] as const

const citySchema = z.object({
  name: z.string(), // string
  population: z.number().gt(0), // number and greater than 0
  area: z.string().min(5), //min length
  rating: z.string().optional(), //optional stuff
  activities: z.enum(["Football", "Library", "Hiking", "Camping", "Disco", "Concerts"]).optional(), //enum
  activitiesEnum: z.nativeEnum(Activities) // or z.nativeEnum(activities)
}).passthrough(); //diferent keys can be assigned

//strict() so to don't allow different assignment keys


type City = z.infer<typeof citySchema>; // creating the type from z schema 

const city = {
  name: "Castelo Branco",
  population: 177912,
  area: "1 438 km²",
  activitiesEnum: Activities.Concerts,
  hasPools: true
} as City;

console.log(citySchema.parse(city));

console.log(citySchema.safeParse(city)); //returns success

console.log(citySchema.shape);

console.log(citySchema.partial().parse(city))

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Zod Learning</h1>
    <h3> City: ${city.name}</h3>
    <ul>
      <li>Population: ${city.population}</li>
      <li>Area: ${city.area}</li>
      <li>Activities: ${city.activitiesEnum}</li>
    </ul>
  </div>
`;
