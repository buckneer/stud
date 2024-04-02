// @ts-ignore
import get from 'lodash/get';

const getLabel = (toLook: any[] | string, data: any[], secondParam: string = '_id', param: string = '_id', ) => {
  if(typeof toLook === 'object') {
    if(toLook?.length > 0){
      const selected = toLook!.map((prof: string) => ({
        value: prof,
        // @ts-ignore
        label: get(data.find((p: any) => toLook.indexOf(p[param]) !== -1), secondParam)// change this...
      }));

      return selected;
    }
  } else if (typeof toLook === 'string') {
    const selected = { value: toLook, label: get(data.find((p: any) => get(p, secondParam) === toLook), param) }    
    return selected;
  }
  
}
export default getLabel;