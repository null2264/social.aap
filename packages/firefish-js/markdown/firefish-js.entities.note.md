<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [firefish-js](./firefish-js.md) &gt; [entities](./firefish-js.entities.md) &gt; [Note](./firefish-js.entities.note.md)

## entities.Note type

**Signature:**

```typescript
export declare type Note = {
	id: ID;
	createdAt: DateString;
	text: string | null;
	cw: string | null;
	user: User;
	userId: User["id"];
	reply?: Note;
	replyId: Note["id"];
	renote?: Note;
	renoteId: Note["id"];
	files: DriveFile[];
	fileIds: DriveFile["id"][];
	visibility: "public" | "home" | "followers" | "specified";
	visibleUserIds?: User["id"][];
	localOnly?: boolean;
	channel?: Channel["id"];
	myReaction?: string;
	reactions: Record<string, number>;
	renoteCount: number;
	repliesCount: number;
	poll?: {
		expiresAt: DateString | null;
		multiple: boolean;
		choices: {
			isVoted: boolean;
			text: string;
			votes: number;
		}[];
	};
	emojis: {
		name: string;
		url: string;
	}[];
	uri?: string;
	url?: string;
	updatedAt?: DateString;
	isHidden?: boolean;
};
```
**References:** [ID](./firefish-js.entities.id.md)<!-- -->, [DateString](./firefish-js.entities.datestring.md)<!-- -->, [User](./firefish-js.entities.user.md)<!-- -->, [Note](./firefish-js.entities.note.md)<!-- -->, [DriveFile](./firefish-js.entities.drivefile.md)<!-- -->, [Channel](./firefish-js.entities.channel.md)

