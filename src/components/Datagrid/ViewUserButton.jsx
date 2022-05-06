import * as React from 'react';

const image_src = "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"

function DoSomething() {
    console.log("clicked!");
}

export default function ViewUserButton(props) {
    return <div>
        <button type = "button" onClick={DoSomething}>
            <input type="image" height="40" width="40" src={image_src}
                   alt={"View User"}/>
        </button>
    </div>
}