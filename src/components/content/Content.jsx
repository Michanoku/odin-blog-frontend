import { useState } from "react";
import { useParams } from "react-router-dom";

import { ContentAside } from "./ContentAside.jsx";
import { ContentSection } from "./ContentSection.jsx";
import "../../styles/content/content.css";

// The main content view of the page, has a section for blog and aside
export default function Content({ user }) {
  // Categories list to be used in aside
  const [categories, setCategories] = useState([]);
  const { postId, category } = useParams();

  return (
    <>
      <ContentSection
        user={user}
        postId={postId}
        category={category}
        setCategories={setCategories}
      />
      <ContentAside user={user} categories={categories} />
    </>
  );
}
