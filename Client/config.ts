var config = {
	Players: [
		{
			Name: "Muddy Hag",
			autoRotate:false,
			MaxHP: 100,
			Pic: {
				Src: "champions/muddy_hag/stand_{rotation}.png",
				Width: 100, Height: 100,
			},

			Anim: {
				TeleportIn: {
					Path: "champions/muddy_hag/teleport_in/", FrameCount: 17, Width: 210, Height: 210
				},
				TeleportOut: {
					Path: "champions/muddy_hag/teleport_out/", FrameCount: 15, Width: 210, Height: 210
				},
				Bolt: {
					Path: "champions/muddy_hag/bolt/", FrameCount: 32, Width: 70, Height: 70
				},
				Ultimate: {
					Path: "champions/muddy_hag/ultimate/", FrameCount: 23, Width: 210, Height: 210
				}
			}
		}
	],
	Ground: {
		Src: "map/map.png",
		Size: { x: 10, y: 10 },
		UpDownSideColl: [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
			[0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
			[0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		LeftRightSideColl: [
			[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
			[1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
			[1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1],
			[1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
			[1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
		],
		WatarAnim: { Path: "map/water/", FrameCount: 10, Width: 368, Height: 436 }
	},
	hudSrc: "hud/hud.png"
}

