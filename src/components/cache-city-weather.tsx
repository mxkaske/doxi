import React from "react";
import { Button } from "@/ui/button";
import Input from "@/ui/input";
import { Select } from "@/ui/select";

// add list of cached cities?

const CITY = "Berlin,DE";

async function fetchData(city: string) {
  const res = await fetch(`/api/weather?q=${city}`);
  const json = await res.json();
  console.log(json);
  return json;
}

export default function CacheCityWeather() {
  const [temp, setTemp] = React.useState(0);

  React.useEffect(() => {
    fetchData(CITY);
  }, []);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            city: { value: string };
          };
          await fetchData(target.city.value);
        }}
      >
        <label htmlFor="city">
          City, Country Code
          {/* <Input name="city" defaultValue={CITY} /> */}
          <Select id="city" name="city">
            <option label="Berlin, DE" value="Berlin,DE" />
            <option label="Paris, FR" value="Paris,FR" />
          </Select>
        </label>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
