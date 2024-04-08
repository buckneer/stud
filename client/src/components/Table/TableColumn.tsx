import {ReactNode} from "react";


export interface ITD {
	children: ReactNode;
}

function TD({children, className} : ITD & React.HTMLAttributes<HTMLTableDataCellElement>) {
	return (
		<td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 ${className}`}>
			{children}
		</td>
	);
}

export default TD
