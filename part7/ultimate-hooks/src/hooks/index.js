import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useResource = (url) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setValue(response.data);
      })
      .catch((e) => {});
  }, []);

  const create = async (item) => {
    const response = await axios.post(url, item);
    return setValue(value.concat(response.data));
  };

  return [value, { create }];
};
