export const listGrudges = `
  query ListGrudges {
    listGrudges {
      items {
        id
        person
        deed
        avenged
      }
    }
  }
`

export const createGrudge = `
  mutation CreateGrudge(
    $person: String!
    $deed: String!
    $avenged: Boolean!
  ) {
    createGrudge(input: {
      person: $person,
      deed: $deed,
      avenged: $avenged
    }) {
      id
      person
      deed
      avenged
    }
  }
`