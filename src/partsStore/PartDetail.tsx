import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IPart from "../models/IPart";
import { DataType } from "../dataStore/dataStore";
import Navigation from "./Navigation";

const PartDetail = () => {
  const { name }: any = useParams();
  const parts: Array<IPart> = useSelector((dataStore: DataType) => dataStore.parts);
  const [selected, setSelected] = useState<IPart>();

  // function for add icon based on 'type'
  const getIcon = () => {
    if (selected) {
      switch (selected.type.toLowerCase()) {
        case "monitor":
          return <i className="fa fa-tv fa-3x"></i>;
        case "mousepad":
          return <i className="fa fa-mouse fa-3x"></i>;
        case "keyboard":
          return <i className="fa fa-keyboard fa-3x"></i>;
        case "mouse":
          return <i className="fa fa-mouse fa-3x"></i>;
      }
    }
  };

  // find especific 'part' in redux Store
  useEffect(() => {
    if (name && parts.length > 0) {
      const part = parts.find((item: IPart) =>
        item.name.toLocaleLowerCase() === name);
      setSelected(part);
    }
  }, [name, parts]);

  return (
    <div className="Container">
      <Navigation />

      <h2 style={{ textAlign: "left", padding: "0 1em" }}>Part Details</h2>
      <div className="PartWrapper">
        {getIcon()}
        <h2>{selected?.name}</h2>
        <h3>{selected?.type}</h3>
        <h3 style={{ color: "maroon" }}>
          {selected?.price}
        </h3>
      </div>
    </div>

  );
};

export default PartDetail;