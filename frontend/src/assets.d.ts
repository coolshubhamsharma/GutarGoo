//here we are declaring a module for .mp3 files so TypeScript knows how to handle them
//This tells TypeScript to treat .mp3 files as strings (their file paths)

declare module '*.mp3' {
    const value: string;
    export default value;
}

//This tells TypeScript to treat all .css files as modules, and it resolves the error for ./index.css
declare module "*.css";



