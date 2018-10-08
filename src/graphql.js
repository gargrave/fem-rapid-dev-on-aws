export const ListGrudges = `
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

export const CreateGrudge = `
  mutation CreateGrudge(
    $person: String!
    $deed: String!
    $avenged: Boolean!
  ) {
    createGrudge(input: {
      person: $person
      deed: $deed
      avenged: $avenged
    }) {
      id
      person
      deed
      avenged
    }
  }
`

export const UpdateGrudge = `
  mutation UpdateGrudge(
    $id: ID!
    $avenged: Boolean!
  ) {
    updateGrudge(input: {
      id: $id
      avenged: $avenged
    }) {
      id
      person
      deed
      avenged
    }
  }
`

export const DeleteGrudge = `
  mutation DeleteGrudge(
    $id: ID!
  ) {
    deleteGrudge(input: {
      id: $id
    }) {
      id
    }
  }
`

export const SubscribeToNewGrudge = `
  subscription SubscribeToNewGrudge {
    onCreateGrudge {
      id
      person
      deed
      avenged
    }
  }
`