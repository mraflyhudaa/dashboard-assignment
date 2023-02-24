export default function Input(props) {
  return (
    <div>
      <label
        htmlFor={props.htmlFor}
        className='block mb-2 text-sm font-medium text-headline '
      >
        {props.label}
      </label>
      <input
        {...props}
        className='bg-gray-50 border border-gray-300 text-headline text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
      />
    </div>
  );
}
