import React, { useEffect, useState } from 'react'
import { databases } from '../../lib/appwrite';
import { useParams } from 'react-router-dom';
import Sidebar from '../Dashboard';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useIdeas } from '../../lib/context/codeSnip';
import { debounce } from 'lodash';


export default function NoteDisplay() {
    const { id } = useParams(); // Get the document ID from URL
    const [idea, setIdea] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const IdeasContext = useIdeas();
    const [updated, setUpdated] = useState(null);
    const debouncedUpdate = debounce((ideaId, title, content) => {
        IdeasContext.update(ideaId, { Title: title, Content: content });
      }, 1000); // waits 1000ms after the last call to run the function
    useEffect(() => {
        if (idea) {
            debouncedUpdate(idea.$id, title, content);
        }
        const now = new Date();
        const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        setUpdated(formattedTime);      
    }, [title, content]);
    useEffect(() => {
      setContent(idea?.Content || '');
      setTitle(idea?.Title || '');
    }, [idea]);
    useEffect(() => {
        async function fetchCodeShot() {
          try {
            const response = await databases.getDocument("notes", "note", id);
            if (response) {
              setIdea(response);
            } else {
              setIdea(null);
            }
          } catch (error) {
            setIdea(null);
          }
        }
        fetchCodeShot();
      }, [id]);
  return (
    <>
    <Sidebar />
    <div className="sm:p-5 p-4 sm:ml-64">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12 p-2">
                <p>{updated}</p>
              <input className="text-5xl font-bold mx-auto mb-4 bg-base-100 rounded-lg focus:ring-0 outline-none placeholder:text-5xl placeholder:font-bold border-none h-16 w-screen"
              value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='Untitled Note'
              >
              </input>
                <ReactTextareaAutosize className="rounded-lg bg-base-100 focus:ring-0 outline-none placeholder:text-base placeholder:font-light border-none h-16 text-base font-light resize-none pl-1 w-screen max-w-4xl" 
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder='Start typing...'
                />
              </div>
              </div>
    </>
  )
}
