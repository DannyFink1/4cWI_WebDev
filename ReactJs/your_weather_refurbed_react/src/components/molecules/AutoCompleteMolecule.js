import React, { useEffect, useRef, useState } from 'react'


export default function AutoCompleteMolecule({ visible, autocompleteValue, visibleTrue, visibleFalse }) {
    let tempAutoComplete = [];
    let output = "";
    let ref = useRef(null);
    const [clicked, setClicked] = useState(false);



    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                console.log("ja drauf");
                setClicked(true)
                visibleFalse(event);

            }
        };

        document.addEventListener("click", handleClick);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            console.log("cleanup");
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {


        if (tempAutoComplete !== autocompleteValue && autocompleteValue.results != null) {
            tempAutoComplete = autocompleteValue;
            console.log("tempVaule", tempAutoComplete)
            tempAutoComplete.results.forEach((element, index) => {
                output += '<div class="py-6 flex items-center w-full border-t border-gray-200 hover:bg-gray-50" id="ac-' + index + '" ">' +
                    '<a href="#" class="flex-1">' +
                    '<div class="text-gray-800 text-base" ">' + element.city + ", " + element.country + '</div>' +
                    '</a>' +
                    '<div>' +
                    '<a href="https://www.google.at/maps/place/' + element.city + '+' + element.country + '" target="_blank">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">' +
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />' +
                    '</svg>' +
                    '</a>' +
                    '</div>' +
                    '</div>';
            })
            const divElement = document.getElementById("autocomplete");
            divElement.innerHTML = output;
        }





    }, [autocompleteValue])


    let elementStyle;
    if (visible) {
        console.log(clicked, "visible");
        elementStyle = "bg-white rounded-lg shadow-xl px-4 absolute mt-8 w-[90vw] md:w-[30vw] border-solid border-black border-[2px] top-[80px] z-10";
    } else {
        console.log(clicked, "not visible");

        elementStyle = "bg-white rounded-lg shadow-xl px-4 absolute mt-8 w-[90vw] md:w-[30vw] border-solid border-black border-[2px] top-[80px] z-10 hidden";
    }

    return (
        <div className={elementStyle} id="autocomplete" ref={ref}>

            <div className="py-6 flex items-center w-full hover:bg-gray-50">
                <a href="#root" class="flex-1">
                    <div className="text-gray-400 text-base"></div>
                </a>
                <div>
                    <a href="https://www.google.at/maps/place/City+Dornbirn">
                    </a>
                </div>
            </div>


        </div>
    )
}


