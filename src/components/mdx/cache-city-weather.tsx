import React from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

// add list of cached cities?

const CITY = "Berlin,DE";

async function fetchData(city: string) {
  // `no-store`(!) - otherwise, Next.js will cache the response (304 status)
  const res = await fetch(`/api/weather?q=${city}`, { cache: "no-store" });
  const json = await res.json();
  console.log(json, res.headers.get("Upstash-Redis-Cache"));
  return json;
}

export default function CacheCityWeather() {
  const [temp, setTemp] = React.useState(0);

  React.useEffect(() => {
    fetchData(CITY);
  }, []);

  return (
    <form
      className="space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          city: { value: string };
        };
        await fetchData(target.city.value);
      }}
    >
      <label htmlFor="city" className="block">
        City, Country Code
        {/* <Input name="city" defaultValue={CITY} /> */}
        <Select id="city" name="city" className="ml-2">
          <option label="Berlin, DE" value="Berlin,DE">
            Berlin,DE
          </option>
          <option label="Paris, FR" value="Paris,FR">
            Paris,FR
          </option>
        </Select>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
}
