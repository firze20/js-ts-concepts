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
  Concerts = "Concerts",
}

// another way

const activities = [
  "Football",
  "Library",
  "Hiking",
  "Camping",
  "Disco",
  "Concerts",
] as const;

const citySchema = z
  .object({
    id: z.union([z.string(), z.number()]), //string | number
    idExample: z.string().or(z.number()).optional(), // another example of union
    name: z.string(), // string
    population: z.number().gt(0), // number and greater than 0
    area: z.string().min(5), //min length
    rating: z.string().optional(), //optional stuff
    activities: z
      .enum(["Football", "Library", "Hiking", "Camping", "Disco", "Concerts"])
      .optional(), //enum
    activitiesEnum: z.nativeEnum(Activities), // or z.nativeEnum(activities)
    villages: z.array(z.string()).nonempty(), // array of strings
    //tuple Example
    //estadoActual = z.tuple([z.string(), z.date()]).rest(z.number())
  })
  .passthrough(); //diferent keys can be assigned

//strict() so to don't allow different assignment keys

type City = z.infer<typeof citySchema>; // creating the type from z schema

const city = {
  id: 2,
  name: "Castelo Branco",
  population: 177912,
  area: "1 438 km²",
  activitiesEnum: Activities.Concerts,
  villages: ["Penamacor", "Aranhas", "Meimoa", "Meimao"],
  hasPools: true, // this is not in the Schema but we are using passthrough()
} as City;

console.log(citySchema.parse(city));

console.log(citySchema.safeParse(city)); //returns success

console.log(citySchema.shape);

console.log(citySchema.partial().parse(city));

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Zod Learning</h1>
    <h3> City: ${city.name}</h3>
    <ul>
      <li>Population: ${city.population}</li>
      <li>Area: ${city.area}</li>
      <li>Activities: ${city.activitiesEnum}</li>
      <li>Pools: ${city.hasPools ? "Yes" : "No"}</li>
    </ul>
    <h4>Villages :</h4>
    <ul>
    ${city.villages.map((village) => `<li>${village}</li>`).join("")}
    </ul>
  </div>
`;
