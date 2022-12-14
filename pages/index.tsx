import type { NextPage } from 'next'
import React, { useEffect, useRef } from 'react'

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';

const Home: NextPage = () => {
  const fileTempl = useRef<any>(null);
  const imageTempl = useRef<any>(null);
  const empty = useRef<any>(null);
  const FILES = useRef({})
  const gallery = useRef<any>(null)
  const overlay = useRef<any>(null)
  const hidden = useRef<any>(null)
  const counter = useRef<number>(0)

  useEffect(() => {
    fileTempl.current = document.getElementById("file-template")
    imageTempl.current = document.getElementById("image-template")
    empty.current = document.getElementById("empty");

    gallery.current = document.getElementById("gallery")
    overlay.current = document.getElementById("overlay");
    hidden.current = document.getElementById("hidden-input");

    document.getElementById("button").onclick = () => hidden.current.click();
    hidden.current.onchange = (e) => {
      for (const file of e.target.files) {
        addFile(gallery.current, file);
      }
    };

    // event delegation to caputre delete events
    // fron the waste buckets in the file preview cards
    gallery.current.onclick = ({ target }) => {
      if (target.classList.contains("delete")) {
        const ou: any = target.dataset.target;
        document.getElementById(ou).remove();
        gallery.current.children.length === 1 && empty.current.classList.remove("hidden");
        delete FILES.current[ou];
      }
    };
  }, [])

  const uploadHandler = () => {
    alert(`Submitted Files:\n${JSON.stringify(FILES.current)}`);
  };

  const cancelUpload = () => {
    if (gallery.current.children.length <= 0) return;
    while (gallery.current.children.length > 0) {
      gallery.current.lastChild.remove();
    }
    FILES.current = {};
    empty.current.classList.remove("hidden");
    gallery.current.append(empty.current);
  };

  const dragEnterHandler = (e: any) => {
    e.preventDefault();
    if (!hasFiles(e)) {
      return;
    }
    ++counter.current && overlay.current.classList.add("draggedover");
  }

  const dragLeaveHandler = (e: any) => {
    1 > --counter.current && overlay.current.classList.remove("draggedover");
  }

  const dragOverHandler = (e: any) => {
    if (hasFiles(e)) {
      e.preventDefault();
    }
  }



  const hasFiles = ({ dataTransfer: { types = [] } }) =>
    types.indexOf("Files") > -1;

  const dropHandler = (ev: any) => {
    ev.preventDefault();
    for (const file of ev.dataTransfer.files) {
      addFile(gallery.current, file);
      overlay.current.classList.remove("draggedover");
      counter.current = 0;
    }
  }

  const addFile = (target: any, file: any) => {
    const isImage = file.type.match("image.*"),
      objectURL = URL.createObjectURL(file);

    const clone = isImage
      ? imageTempl.current.cloneNode(true)
      : fileTempl.current.cloneNode(true);

    clone.style.display = 'block';
    clone.querySelector("h1").textContent = file.name;
    clone.querySelector("li").id = objectURL;
    clone.querySelector(".delete").dataset.target = objectURL;
    clone.querySelector(".size").textContent =
      file.size > 1024
        ? file.size > 1048576
          ? Math.round(file.size / 1048576) + "mb"
          : Math.round(file.size / 1024) + "kb"
        : file.size + "b";

    isImage &&
      Object.assign(clone.querySelector("img"), {
        src: objectURL,
        alt: file.name
      });

    empty.current.classList.add("hidden");
    target.prepend(clone.childNodes[0]);

    FILES.current[objectURL] = file;
  }

  const onInit = () => {
    console.log('lightGallery has been initialized');
  };

  return (
    <div>


      <div className="App">
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
        >
          <a href="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png">
            <img alt="img1" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" />
          </a>
          <a href="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png">
            <img alt="img2" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" />
          </a>
        </LightGallery>
      </div>

      <div className="h-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#edf2f7" }}>
        <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
          <main className="container mx-auto max-w-screen-lg h-full">
            {/* <!-- file upload modal --> */}
            <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md" onDrop={dropHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDragEnter={dragEnterHandler}>
              {/* <!-- overlay --> */}
              <div id="overlay" className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
                <i>
                  <svg className="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                  </svg>
                </i>
                <p className="text-lg text-blue-700">Drop files to upload</p>
              </div>

              {/* <!-- scroll area --> */}
              <section className="h-full overflow-auto p-8 w-full flex flex-col">
                <header className="rounded border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                  <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                  </p>
                  <input id="hidden-input" type="file" multiple className="hidden" accept="image/png, image/gif, image/jpeg" />
                  <button id="button" className="mt-2 rounded px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                    Upload a file
                  </button>
                </header>

                <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                  To Upload
                </h1>

                <ul id="gallery" className="flex flex-wrap -m-1">
                  <li id="empty" className="h-full w-full text-center flex flex-col items-center justify-center">
                    <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                    <span className="text-small text-gray-500">No files selected</span>
                  </li>
                </ul>
              </section>

              {/* <!-- sticky footer --> */}
              <footer className="flex justify-end px-8 pb-8 pt-4">
                <button onClick={uploadHandler} className="rounded px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
                  Upload now
                </button>
                <button onClick={cancelUpload} className="ml-3 rounded px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                  Cancel
                </button>
              </footer>
            </article>
          </main>
        </div>

        {/* <!-- using two similar templates for simplicity in js code --> */}
        <div id="file-template" style={{ display: 'none' }}>
          <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
            <article tabIndex={0} className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm">
              <img alt="upload preview" className="img-preview hidden w-full h-full sticky object-contain rounded-md bg-fixed" />

              <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                <h1 className="flex-1 group-hover:text-blue-800"></h1>
                <div className="flex">
                  <span className="p-1 text-blue-800">
                    <i>
                      <svg className="fill-current w-4 h-4 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                      </svg>
                    </i>
                  </span>
                  <p className="p-1 size text-xs text-gray-700"></p>
                  <button className="delete ml-auto p-1 focus:outline-none hover:bg-gray-300 rounded-md text-gray-800">
                    <svg className="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path className="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                    </svg>
                  </button>
                </div>
              </section>
            </article>
          </li>
        </div>

        <div id="image-template" style={{ display: 'none' }}>
          <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
            <article tabIndex={0} className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
              <img alt="upload preview" className="img-preview w-full h-full sticky object-contain rounded-md bg-fixed" />

              <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                <h1 className="flex-1"></h1>
                <div className="flex">
                  <span className="p-1">
                    <i>
                      <svg className="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                      </svg>
                    </i>
                  </span>

                  <p className="p-1 size text-xs"></p>
                  <button className="delete ml-auto p-1 focus:outline-none hover:bg-gray-300 rounded-md">
                    <svg className="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path className="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                    </svg>
                  </button>
                </div>
              </section>
            </article>
          </li>
        </div>
      </div>
    </div>
  )
}

export default Home
