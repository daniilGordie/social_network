export const updateObjInArray = (items, itemID, objPropName, newObjProps) => {
  return items.map((u) => {
    if (u[objPropName] === itemID) {
      return { ...u, ...newObjProps }
    }
    return u
  })
}
