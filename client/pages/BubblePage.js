import React, { useState } from "react";
import BubbleChart from "../components/BubbleChart";
import { Route, Routes } from "react-router-dom";
import { useLoading } from "../ library/useloading";
import { fetchJSON } from "../ library/http";

export function BubblePage() {
  const { loading, error, data } = useLoading(
    async () => await fetchJSON("/api/category/all")
  );
  if (loading) {
    return <div>Loading ....</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
  const alterSelection = (tag) => {
    console.log("sType before:" + tag.selectionType);
    if (tag.selectionType === 2) {
      tag.selectionType = 0;
    } else {
      ++tag.selectionType;
    }
    console.log("sType after:" + tag.selectionType);
  };
  const toggleSelected = (id) => {
    const actualId = id.target.__data__.id;
    setTags(
      tags.map((tag) =>
        tag.id === actualId
          ? { ...tag, selectionType: alterSelection(tag) }
          : tag
      )
    );
    console.log(id.target.__data__);
    console.log("Should change selection of id: " + id.target.__data__.id);
  };
  const [tags, setTags] = useState([]);

  return (
    <div style={{ width: "100%" }}>
      <section className="section bubble-container" style={{ height: "100%" }}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {tags.length > 0 ? (
                  <BubbleChart tagsData={tags} setSelected={toggleSelected} />
                ) : (
                  "No categories to show"
                )}
              </div>
            }
          />
        </Routes>
      </section>
    </div>
  );
}
