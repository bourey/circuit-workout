var $ref = falcor.Model.ref;

var model = new falcor.Model({
  cache: {
    exercisesById: {
      1: {
        id: 1,
        name: "Jumping jacks",
        requiresEquipment: false,
        type: ["cardio"],
      },
      2: {
        id: 2,
        name: "Biceps curl",
        requiresEquipment: true,
        type: ["upper"],
      },
      3: {
        id: 3,
        name: "Shoulder raise",
        requiresEquipment: true,
        type: ["upper"],
      },
      4: {
        id: 4,
        name: "Shoulder press",
        requiresEquipment: true,
        type: ["upper"],
      },
      5: {
        id: 5,
        name: "Biceps curl + shoulder press",
        requiresEquipment: true,
        type: ["upper", "lower"],
      },
      6: {
        id: 6,
        name: "Squats",
        requiresEquipment: false,
        type: ["lower"],
      },
      7: {
        id: 7,
        name: "Squat jumps",
        requiresEquipment: false,
        type: ["lower", "cardio"],
      },
      8: {
        id: 8,
        name: "Lunges (forward)",
        requiresEquipment: false,
        type: ["lower"],
      },
      9: {
        id: 9,
        name: "Lunges (back)",
        requiresEquipment: false,
        type: ["lower"],
      },
      10: {
        id: 10,
        name: "Lunges (side)",
        requiresEquipment: false,
        type: ["lower"],
      },
      11: {
        id: 11,
        name: "Lunge with biceps curl",
        requiresEquipment: true,
        type: ["lower"],
      },
      12: {
        id: 12,
        name: "Squat with shoulder raise",
        requiresEquipment: true,
        type: ["lower"],
      },
      13: {
        id: 13,
        name: "Row",
        requiresEquipment: true,
        type: ["upper"],
      },
      14: {
        id: 14,
        name: "Bridge",
        requiresEquipment: false,
        type: ["core"],
      },
      15: {
        id: 15,
        name: "Hip raise",
        requiresEquipment: false,
        type: ["core"],
      },
      16: {
        id: 16,
        name: "Plank",
        requiresEquipment: false,
        type: ["core"],
      },
      17: {
        id: 17,
        name: "Side plank",
        requiresEquipment: false,
        type: ["core"],
      },
      18: {
        id: 18,
        name: "Mountain climbers",
        requiresEquipment: false,
        type: ["core"],
      }
    },
    exercises: [
        { $type: "ref", value: ["exercisesById", 1] },
        { $type: "ref", value: ["exercisesById", 2] },
        { $type: "ref", value: ["exercisesById", 3] },
        { $type: "ref", value: ["exercisesById", 4] },
        { $type: "ref", value: ["exercisesById", 5] },
        { $type: "ref", value: ["exercisesById", 6] },
        { $type: "ref", value: ["exercisesById", 7] },
        { $type: "ref", value: ["exercisesById", 8] },
        { $type: "ref", value: ["exercisesById", 9] },
        { $type: "ref", value: ["exercisesById", 10] },
        { $type: "ref", value: ["exercisesById", 11] },
        { $type: "ref", value: ["exercisesById", 12] },
        { $type: "ref", value: ["exercisesById", 13] },
        { $type: "ref", value: ["exercisesById", 14] },
        { $type: "ref", value: ["exercisesById", 15] },
        { $type: "ref", value: ["exercisesById", 16] },
        { $type: "ref", value: ["exercisesById", 17] },
        { $type: "ref", value: ["exercisesById", 18] },
    ]
  }  
});
