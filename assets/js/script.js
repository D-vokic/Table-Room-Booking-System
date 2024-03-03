/**
 * ViewModel for rooms and tables.
 * @type {Object}
 */
const roomsViewModel = {
  rooms: [
    {
      roomName: "Room 1",
      tables: [
        { fullName: "A01" },
        { fullName: "00" },
        { fullName: "A02" },
        { fullName: "B03" },
        { fullName: "C04" },
        { fullName: "N05" },
        { fullName: "A06" },
        { fullName: "01" },
        { fullName: "A08" },
        { fullName: "D09" },
        { fullName: "07" },
        { fullName: "A10" },
      ],
    },
    {
      roomName: "Room 2",
      tables: [
        { fullName: "09" },
        { fullName: "N01" },
        { fullName: "05" },
        { fullName: "A00" },
        { fullName: "E02" },
        { fullName: "N03" },
        { fullName: "F04" },
        { fullName: "04" },
        { fullName: "08" },
        { fullName: "N05" },
        { fullName: "03" },
        { fullName: "02" },
        { fullName: "G06" },
        { fullName: "N07" },
        { fullName: "H08" },
        { fullName: "18" },
        { fullName: "N09" },
        { fullName: "I10" },
        { fullName: "06" },
        { fullName: "10" },
        { fullName: "B00" },
      ],
    },
    {
      roomName: "Room 3",
      tables: [
        { fullName: "A11" },
        { fullName: "12" },
        { fullName: "N12" },
        { fullName: "A13" },
        { fullName: "N14" },
        { fullName: "A15" },
        { fullName: "N16" },
        { fullName: "A17" },
        { fullName: "N18" },
        { fullName: "6" },
        { fullName: "A19" },
        { fullName: "N20" },
      ],
    },
  ],
};

/**
 * Gets the element by its ID.
 * @param {string} id - The ID of the element.
 * @returns {HTMLElement} The element with the specified ID.
 */
function getElementById(id) {
  return document.getElementById(id);
}

/**
 * Displays an element with the specified display style.
 * @param {HTMLElement} element - The element to display.
 * @param {string} displayStyle - The display style to apply (e.g., "block", "none").
 */
function displayElement(element, displayStyle) {
  element.style.display = displayStyle;
}

/**
 * Adds an event listener to the specified element.
 * @param {HTMLElement} element - The element to add the event listener to.
 * @param {string} event - The name of the event to listen for (e.g., "click").
 * @param {Function} callback - The function to call when the event occurs.
 */
function addEventListener(element, event, callback) {
  element.addEventListener(event, callback);
}

/**
 * Finds the first free table in any room.
 * @returns {Object|null} An object containing the room and table name of the first free table, or null if all tables are occupied.
 */
function findFirstFreeTableInAnyRoom() {
  const validRooms = ["Room 1", "Room 2", "Room 3"];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (const room of roomsViewModel.rooms) {
    const roomTables = room.tables.map((table) => table.fullName);

    for (let i = 0; i <= 20; i++) {
      let tableName = i.toString().padStart(2, "0");
      if (!roomTables.includes(tableName)) {
        return { room: room.roomName, table: tableName };
      }
    }

    for (let i = 0; i < alphabet.length; i++) {
      for (let j = 1; j <= 20; j++) {
        let tableName = alphabet[i] + j.toString().padStart(2, "0");
        if (!roomTables.includes(tableName)) {
          return { room: room.roomName, table: tableName };
        }
      }
    }
  }

  return null;
}

/**
 * Shows the booking form.
 */
function showBookingForm() {
  const bookNowForm = getElementById("bookNowForm");
  const bookRoomInput = getElementById("bookRoomInput");
  const bookTableInput = getElementById("bookTableInput");

  if (
    bookNowForm.style.display === "none" ||
    bookNowForm.style.display === ""
  ) {
    displayElement(bookNowForm, "block");
    bookNowForm.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    bookNowForm.style.width = "300px";
    bookNowForm.style.margin = "auto";
    bookRoomInput.focus();
  } else {
    hideBookingForm();
  }
}

/**
 * Hides the booking form.
 */
function hideBookingForm() {
  const bookNowForm = getElementById("bookNowForm");
  displayElement(bookNowForm, "none");
}

/**
 * Adds a room to the view model if it's valid.
 * @param {string} roomName - The name of the room to add.
 */
function addRoom(roomName) {
  if (!isValidRoom(roomName)) {
    alert(
      "Invalid room name. Please choose one of the existing rooms: Room 1, Room 2, or Room 3."
    );
    console.log(
      "Invalid room name. Please choose one of the existing rooms: Room 1, Room 2, or Room 3."
    );
    return;
  }

  const room = findRoomByName(roomName);
  if (!room) {
    roomsViewModel.rooms.push({ roomName, tables: [] });
    alert(`Room ${roomName} successfully added.`);
    console.log(`Room ${roomName} successfully added.`);
  }
}

/**
 * Checks if the room name is valid.
 * @param {string} roomName - The name of the room to check.
 * @returns {boolean} True if the room name is valid, otherwise false.
 */
function isValidRoom(roomName) {
  const validRooms = ["Room 1", "Room 2", "Room 3"];
  return validRooms.includes(roomName);
}

/**
 * Finds a room by its name.
 * @param {string} roomName - The name of the room to find.
 * @returns {Object|undefined} The room object if found, otherwise undefined.
 */
function findRoomByName(roomName) {
  return roomsViewModel.rooms.find((room) => room.roomName === roomName);
}

// Event listeners...
addEventListener(getElementById("bookNowBtn"), "click", () => {
  showBookingForm();
});

/**
 * Adds an event listener to the "Add Room and Table" button.
 * When clicked, it retrieves the input values for room and table,
 * adds the room if it's valid, and adds the table to the room if it doesn't exist.
 * If the table exists, it offers to book the next available table.
 * @param {Event} event - The click event.
 */
addEventListener(getElementById("addBookRoomBtn"), "click", (event) => {
  // Get the trimmed input values for room and table
  const bookRoomInputValue = getElementById("bookRoomInput").value.trim();
  const bookTableInputValue = getElementById("bookTableInput").value.trim();

  // Add the room if it's valid
  addRoom(bookRoomInputValue);

  // Find the room to which the table should be added
  const roomToAddTable = findRoomByName(bookRoomInputValue);

  if (roomToAddTable) {
    // Check if the table already exists in the room
    const tableExists = roomToAddTable.tables.some(
      (table) => table.fullName === bookTableInputValue
    );

    if (!tableExists) {
      // Add the table to the room if it doesn't exist
      roomToAddTable.tables.push({ fullName: bookTableInputValue });
      alert(
        `Table ${bookTableInputValue} successfully added to ${bookRoomInputValue}.`
      );
      console.log(
        `Table ${bookTableInputValue} successfully added to ${bookRoomInputValue}.`
      );
    } else {
      // Find the next available table in any room
      const nextAvailableTable = findFirstFreeTableInAnyRoom();
      if (nextAvailableTable) {
        const confirmation = confirm(
          `Table ${bookTableInputValue} already exists in ${bookRoomInputValue}. Would you like to book the next available table: ${nextAvailableTable.table}?`
        );
        if (confirmation) {
          // Book the next available table if confirmed
          roomToAddTable.tables.push({ fullName: nextAvailableTable.table });
          alert(
            `Table ${nextAvailableTable.table} successfully added to ${bookRoomInputValue}.`
          );
          console.log(
            `Table ${nextAvailableTable.table} successfully added to ${bookRoomInputValue}.`
          );
        }
      } else {
        // Alert if there are no available tables in any room
        alert(`No available tables in any room.`);
        console.log(`No available tables in any room.`);
      }
    }
  }
});

addEventListener(getElementById("resetBtn"), "click", () => {
  getElementById("bookRoomInput").value = "";
  getElementById("bookTableInput").value = "";
  getElementById("bookStartDate").value = "";
  getElementById("bookEndDate").value = "";
});
