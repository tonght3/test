import { Autocomplete, Box, TextField } from "@mui/material";
import { get, head, map } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FilterSelect from "../AutoSelect";

import ProviceData from "../locations/cities.json";

interface HookFormProps {
  province: string;
  district: string;
  ward: string;
}

const defaultValues: HookFormProps = {
  province: "",
  district: "",
  ward: "",
};

const Locations = ({ onChange }) => {
  const hookForm = useForm<HookFormProps>({
    defaultValues,
  });
  const districtRefs = useRef([]);
  const wardRefs = useRef([]);

  return (
    <div className="grid md:grid-cols-3 gap-4 p-4">
      <FilterSelect
        hookForm={hookForm}
        name="province"
        placeholder="Chọn tỉnh/thành"
        label=""
        options={map(get(ProviceData, "data", []), (item: any) => ({
          id: item.id,
          name: item.name,
        }))}
        required
        size="small"
        handleSelectExtend={(data) => {
          const districtsData = get(
            head(
              get(ProviceData, "data", []).filter(
                (item) => get(item, "id") === get(data, "id")
              )
            ),
            "districts",
            {}
          );
          districtRefs.current = get(districtsData, "data", []);

          hookForm.setValue(
            "district",
            get(head(get(districtsData, "data", [])), "id")
          );

          wardRefs.current = get(
            get(head(get(districtsData, "data", [])), "wards"),
            "data",
            []
          );

          hookForm.setValue(
            "ward",
            get(
              head(
                get(get(head(get(districtsData, "data", [])), "wards"), "data")
              ),
              "id"
            )
          );
        }}
      />
      <FilterSelect
        disabled={!districtRefs.current.length}
        hookForm={hookForm}
        name="district"
        placeholder="Chọn quận/huyện"
        label=""
        options={map(districtRefs.current, (item: any) => ({
          id: item.id,
          name: item.name,
        }))}
        required
        size="small"
        handleSelectExtend={(data) => {
          const wardsData = get(
            head(
              districtRefs.current.filter(
                (item) => get(item, "id") === get(data, "id")
              )
            ),
            "wards",
            {}
          );

          wardRefs.current = get(wardsData, "data", []);

          hookForm.setValue(
            "ward",
            get(head(get(wardsData, "data", [])), "id")
          );
        }}
      />
      <FilterSelect
        hookForm={hookForm}
        disabled={!wardRefs.current.length}
        name="ward"
        placeholder="Chọn phường/xã"
        label=""
        options={map(wardRefs.current, (item: any) => ({
          id: item.id,
          name: item.name,
        }))}
        required
        size="small"
        handleSelectExtend={(data) => console.log(data)}
      />
    </div>
  );
};

export default Locations;
