import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchDogBreeds } from "./api-request";

function useDoggyFilter() {
  const [order, setOrder] = useState("Random");
  const [type, setType] = useState("All");
  const [breed, setBreed] = useState("");

  const { data, isError } = useQuery(
    ["dog-breeds"],
    async () => {
      return await fetchDogBreeds();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const breeds = data?.map((breed) => {
    return {
      label: breed.name,
      value: breed.id.toString(),
    };
  });
  const selectedBreed = breeds?.find((option) => option.value === breed);
  const selectBreed = (event: SelectChangeEvent) => {
    setBreed(event.target.value);
  };

  const orders = ["Random", "Asc", "Desc"];
  const selectedOrder = orders.filter((option) => option === order)[0];
  const selectOrder = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setOrder(event.target.value);
  };

  const types = ["All", "Static", "Animated"];
  const selectedType = types.filter((option) => option === type)[0];
  const selectType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return {
    order,
    type,
    breed,
    render: (
      <div className="p-4 grid gap-4 md:grid-cols-3 grid-cols-auto-fit bg-white shadow-lg">
        <FormControl variant="outlined">
          <InputLabel htmlFor="order">Order</InputLabel>
          <Select value={selectedOrder} onChange={selectOrder} label='order'>
            {orders.map((order) => (
              <MenuItem key={order} value={order}>
                {order}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="type">Type</InputLabel>
          <Select value={selectedType} onChange={selectType} label='Type'>
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isError ? null : (
          <FormControl variant="outlined">
            <InputLabel htmlFor="breed">Breed</InputLabel>
            <Select value={selectedBreed?.value} onChange={selectBreed} label='Breed'>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {breeds?.map((breed) => (
                <MenuItem key={breed.label} value={breed.value}>
                  {breed.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
    ),
  };
}

export default useDoggyFilter;
