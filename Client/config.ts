var config = {
	Players: [
		{
			Name: "Muddy Hag",
			MaxHP: 100,
			Pic: {
				Src: "champions/muddy_hag/stand.png",
				Width: 210, Height: 210
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
		Src: "map/map_new.png",
		Size: { x: 10, y: 10 }
	},
	hudSrc: "hud/hud.png"
}

