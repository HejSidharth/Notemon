import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";
import toast from "react-hot-toast";

const CodeShotsContext = createContext();

export const CODE_DATABASE_ID = "notes";
export const CODE_COLLECTION_ID = "codeshot";

export function useCodeShots() {
  return useContext(CodeShotsContext);
}

export function CodeShotsProvider(props) {
  const [codeShots, setCodeShots] = useState([]);
  const storedUserId = localStorage.getItem('userId');

  const init = async () => {
    try {
        const response = await databases.listDocuments(
            CODE_DATABASE_ID,
            CODE_COLLECTION_ID,
            [Query.orderDesc("$createdAt"), Query.limit(1000), Query.equal("userId", storedUserId)]
          );
          setCodeShots(response.documents);
    } catch (error) {
        toast.error(error)
    }
   
  };

  const add = async (codeShot) => {
    try {
        await databases.createDocument(
            CODE_DATABASE_ID,
            CODE_COLLECTION_ID,
            ID.unique(),
            codeShot
          );
          init();
          toast.success("Codeshot created successfully!");
    } catch (error) {
        toast.error("Error creating codeshot!");
    }
    
  };

  const remove = async (id) => {
    try {
        await databases.deleteDocument(CODE_DATABASE_ID, CODE_COLLECTION_ID, id);
    toast.success("Codeshot deleted successfully!");
    init();
    } catch (error) {
        toast.error("Error deleting codeshot!");
    }
    
  };

  const update = async (id, updatedShot) => {
    try {
      await databases.updateDocument(
        CODE_DATABASE_ID,
        CODE_COLLECTION_ID,
        id,
        updatedShot
      );
      init();
      toast.success("Codeshot updated successfully!");
    } catch (error) {
      console.error("Error updating codeshot:", error);
      toast.error("Error updating codeshot!");
    }
  };


  useEffect(() => {
    init();
  }, [storedUserId]); // Add dependencies here if any

  return (
    <CodeShotsContext.Provider value={{ current: codeShots, add, remove, update }}>
      {props.children}
    </CodeShotsContext.Provider>
  );
}
