import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IPart from "../models/IPart";
import { DataType } from "../dataStore/dataStore";
import "./Parts.css";

interface PartsProps {
  sort: boolean;
  reverse: boolean;
}

const Parts: FC<PartsProps> = ({
  sort, reverse
}) => {

  // get 'parts' and 'waiting status' from redux dataStore
  const parts: Array<IPart> = useSelector((dataStore: DataType) => dataStore.parts);
  const searching: boolean = useSelector((dataStore: DataType) => dataStore.waiting);

  const [partCards, setPartCards] = useState<Array<JSX.Element> | null>(null);

  // sort and reverse 'parts' array
  const sortParts = (array: Array<IPart>) => {
    const list = array.map(item => {
      return {
        ...item,
        price: item.price.slice(0, -1)   // remove '$'
      }
    })
    if (sort) {
      list.sort((a, b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : -1);
    }
    if (reverse) {
      list.reverse();
    }
    return list;
  };

  // useEffect triggers for 'parts', 'sort' and 'reverse' changes
  useEffect(() => {
    if (parts && parts.length > 0) {
      const partsByType = sortParts(parts);

      // build cards for each 'part'
      const cards = partsByType.map((part: IPart) => {
        return (
          <div key={part.name} className="PartsWrapper">
            <Link to={`/part/${part.name.toLowerCase()}`} className="Link">
              <h3 className="PartItem">{part.name}</h3>
            </Link>
            <h4 className="PartItem">{part.type}</h4>
            <h4 className="PartItem">${part.price}</h4>
          </div>
        );
      });
      setPartCards(cards);
    } else {
      setPartCards(null);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parts, sort, reverse]);

  return (
    <div className="Container">
      {searching 
        ? <i className="fas fa-sync fa-spin fa-2x Spin"></i>
        : (partCards ?? `No data found.`)
      }
    </div>
  );
};

export default Parts;