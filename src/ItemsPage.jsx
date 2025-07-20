import { useState, useEffect } from "react";
import { Flex, Button, Heading } from "@aws-amplify/ui-react";

export default function ItemsPage({ onReturn }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch(
          "https://brn0mu22y2.execute-api.us-east-1.amazonaws.com/items"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setItems([]);
      }
    }
    fetchItems();
  }, []);

  return (
    <Flex direction="column" alignItems="center" gap="1rem" padding="2rem">
      <Heading level={2}>Items</Heading>
      <table className="items-table">
        <thead>
          <tr>
            {items[0] &&
              Object.keys(items[0]).map((key) => (
                <th key={key}>
                  {key.replace(/\w\S*/g, (w) => w.charAt(0).toLowerCase() + w.slice(1))}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              {Object.entries(item).map(([k, v]) => (
                <td key={k}>{String(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Button variation="primary" onClick={onReturn}>
        Return
      </Button>
    </Flex>
  );
}