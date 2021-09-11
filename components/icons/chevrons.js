const ChevronUp = ({ className }) => {
  return (
    <span className={className}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        x='0'
        y='0'
        viewBox='0 0 24 24'
        className={'fill-current'}
      >
        <path
          className={'fill-current'}
          d='M16 15a1 1 0 01-.71-.29L12 11.41l-3.29 3.3A1 1 0 017.3 13.3l4-4a1 1 0 011.41 0l4 4A1 1 0 0116 15z'
        ></path>
      </svg>
    </span>
  )
}

export default ChevronUp

export const ChevronRight = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100%'
      viewBox='0 0 112 112'
      className={'fill-current'}
    >
      <g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
        <g className={'fill-current'} fillRule='nonzero'>
          <path d='M8.413 112L60.26 60.206a5.957 5.957 0 000-8.412L8.413 0 0 8.405 47.638 56 0 103.596 8.413 112z'></path>
        </g>
      </g>
    </svg>
  )
}

// export const ChevronLeft = () => {
//   return (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       width='100%'
//       viewBox='0 0 112 112'
//       className={'fill-current'}
//     >
//       <g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
//         <g className={'fill-current'} fillRule='nonzero'>
//           <path d='M8.413 112L60.26 60.206a5.957 5.957 0 000-8.412L8.413 0 0 8.405 47.638 56 0 103.596 8.413 112z'></path>
//         </g>
//       </g>
//     </svg>
//   )
// }

export const ChevronDown = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100%'
      viewBox='0 0 112 112'
      className={'fill-current'}
    >
      <g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
        <g
          className={'fill-current'}
          fillRule='nonzero'
          transform='rotate(90 43.5 68.5)'
        >
          <path d='M8.413 112L60.26 60.206a5.957 5.957 0 000-8.412L8.413 0 0 8.405 47.638 56 0 103.596 8.413 112z'></path>
        </g>
      </g>
    </svg>
  )
}
