import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";
import { useUser } from "@clerk/clerk-react";

export const IDEAS_DATABASE_ID = "notes";
export const IDEAS_COLLECTION_ID = "note";

const IdeasContext = createContext();


export function useIdeas() {
  return useContext(IdeasContext);

}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);
  const user = useUser();
  const storedUserId = localStorage.getItem('userId');
  async function add(idea) {
    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      idea
    );
    setIdeas((ideas) => [response.$id, ...ideas].slice(0, 10));
    await init(); // Refetch ideas to ensure we have 10 items
  }

  async function update(id, updatedIdea) {
    try {
      const response = await databases.updateDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        id,
        updatedIdea
      );
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.$id === id ? { ...idea, ...updatedIdea } : idea
        )
      );
    } catch (error) {
      console.error("Error updating idea:", error);
    }
  }

  async function remove(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
    await init();
  }
   async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(1000), Query.equal("userId", storedUserId)]
    );
    setIdeas(response.documents);
  }

  useEffect(() => {
    init();
  });


  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove, update }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
