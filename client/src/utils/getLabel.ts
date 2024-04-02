const getLabel = (toLook: any[] | string, data: any[], param: string = '_id', secondParam: string = 'user.name') => {
  if(typeof toLook === 'object') {
    if(toLook?.length > 0){
      const selected = toLook!.map((prof: string) => ({
        value: prof,
        // @ts-ignore
        label: data.find((p: any) => toLook.indexOf(p[param]) !== -1).user.name // change this...
      }));
      return selected;
    }
  } else if (typeof toLook === 'string') {
    // const selected = { value: toLook, label: data.find((p: any) => toLook.indexOf(p[param]) !== -1).user.name }
  }
  
}

export default getLabel;