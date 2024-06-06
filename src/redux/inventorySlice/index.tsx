import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface InventoryState {
  value: number
  inventoryItems: object,
  brandNames: object,
  projectOwners: object,
  developers: object,
  clients: object,
  assignedInventories: object
}

const initialState: InventoryState = {
  value: 0,
  inventoryItems: [],
  brandNames: [],
  projectOwners: [],
  developers: [],
  clients: [],
  assignedInventories: []
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Add reducers for adding new items to each state array
    addInventoryItem: (state, action: PayloadAction<object>) => {
      state.inventoryItems = action.payload;
    },
    addBrandName: (state, action: PayloadAction<object>) => {
      state.brandNames = action.payload; 
    },
    addProjectOwner: (state, action: PayloadAction<object>) => {
      state.projectOwners = action.payload;
    },
    addDeveloper: (state, action: PayloadAction<object>) => {
      state.developers = action.payload;
    },
    addClient: (state, action: PayloadAction<object>) => {
      state.clients = action.payload;
    },
    addAssignedInventory: (state, action: PayloadAction<object>) => {
      state.assignedInventories = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  addInventoryItem,
  addBrandName,
  addProjectOwner,
  addDeveloper,
  addClient,
  addAssignedInventory
} = inventorySlice.actions

export default inventorySlice.reducer
