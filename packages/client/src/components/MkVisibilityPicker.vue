<template>
	<MkModal
		ref="modal"
		:z-priority="'high'"
		:src="src"
		@click="modal.close()"
		@closed="emit('closed')"
	>
		<div class="_popup" :class="$style.root">
			<button
				key="public"
				class="_button"
				:class="[$style.item, { [$style.active]: v === 'public' }]"
				data-index="1"
				@click="choose('public')"
			>
				<div :class="$style.icon">
					<i class="ph-planet ph-bold ph-lg"></i>
				</div>
				<div :class="$style.body">
					<span :class="$style.itemTitle">{{
						i18n.ts._visibility.public
					}}</span>
					<span :class="$style.itemDescription">{{
						i18n.ts._visibility.publicDescription
					}}</span>
				</div>
			</button>
			<button
				key="home"
				class="_button"
				:class="[$style.item, { [$style.active]: v === 'home' }]"
				data-index="2"
				@click="choose('home')"
			>
				<div :class="$style.icon">
					<i class="ph-house ph-bold ph-lg"></i>
				</div>
				<div :class="$style.body">
					<span :class="$style.itemTitle">{{
						i18n.ts._visibility.home
					}}</span>
					<span :class="$style.itemDescription">{{
						i18n.ts._visibility.homeDescription
					}}</span>
				</div>
			</button>
			<button
				key="followers"
				class="_button"
				:class="[$style.item, { [$style.active]: v === 'followers' }]"
				data-index="3"
				@click="choose('followers')"
			>
				<div :class="$style.icon">
					<i class="ph-lock ph-bold ph-lg"></i>
				</div>
				<div :class="$style.body">
					<span :class="$style.itemTitle">{{
						i18n.ts._visibility.followers
					}}</span>
					<span :class="$style.itemDescription">{{
						i18n.ts._visibility.followersDescription
					}}</span>
				</div>
			</button>
			<button
				key="specified"
				:disabled="localOnly"
				class="_button"
				:class="[$style.item, { [$style.active]: v === 'specified' }]"
				data-index="4"
				@click="choose('specified')"
			>
				<div :class="$style.icon">
					<i class="ph-envelope-simple-open ph-bold ph-lg"></i>
				</div>
				<div :class="$style.body">
					<span :class="$style.itemTitle">{{
						i18n.ts._visibility.specified
					}}</span>
					<span :class="$style.itemDescription">{{
						i18n.ts._visibility.specifiedDescription
					}}</span>
				</div>
			</button>
			<div :class="$style.divider"></div>
			<button
				key="localOnly"
				class="_button"
				:class="[
					$style.item,
					$style.localOnly,
					{ [$style.active]: localOnly },
				]"
				data-index="5"
				@click="localOnly = !localOnly"
			>
				<div :class="$style.icon">
					<i class="ph-hand-fist ph-bold ph-lg"></i>
				</div>
				<div :class="$style.body">
					<span :class="$style.itemTitle">{{
						i18n.ts._visibility.localOnly
					}}</span>
					<span :class="$style.itemDescription">{{
						i18n.ts._visibility.localOnlyDescription
					}}</span>
				</div>
				<div :class="$style.toggle">
					<i
						:class="
							localOnly
								? 'ph-toggle-right ph-bold ph-lg'
								: 'ph-toggle-left ph-bold ph-lg'
						"
					></i>
				</div>
			</button>
		</div>
	</MkModal>
</template>

<script lang="ts" setup>
import { nextTick, watch, shallowRef, ref } from "vue";
import * as misskey from "firefish-js";
import MkModal from "@/components/MkModal.vue";
import { i18n } from "@/i18n";

const modal = shallowRef<InstanceType<typeof MkModal>>();

const props = withDefaults(
	defineProps<{
		currentVisibility: (typeof misskey.noteVisibilities)[number];
		currentLocalOnly: boolean;
		src?: HTMLElement;
	}>(),
	{},
);

const emit = defineEmits<{
	(
		ev: "changeVisibility",
		v: (typeof misskey.noteVisibilities)[number],
	): void;
	(ev: "changeLocalOnly", v: boolean): void;
	(ev: "closed"): void;
}>();

let v = ref(props.currentVisibility);
let localOnly = ref(props.currentLocalOnly);

watch(localOnly, () => {
	emit("changeLocalOnly", localOnly.value);
});

function choose(visibility: (typeof misskey.noteVisibilities)[number]): void {
	v.value = visibility;
	emit("changeVisibility", visibility);
	nextTick(() => {
		modal.value.close();
	});
}
</script>

<style lang="scss" module>
.root {
	width: 240px;
	padding: 8px 0;
}

.divider {
	margin: 8px 0;
	border-top: solid 0.5px var(--divider);
}

.item {
	display: flex;
	padding: 8px 14px;
	font-size: 12px;
	text-align: left;
	width: 100%;
	box-sizing: border-box;

	&:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	&:active {
		background: rgba(0, 0, 0, 0.1);
	}

	&.active {
		color: var(--fgOnAccent);
		background: var(--accent);
	}

	&.localOnly.active {
		color: var(--accent);
		background: inherit;
	}
}

.icon {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
	width: 16px;
	top: 0;
	bottom: 0;
	margin-top: auto;
	margin-bottom: auto;
}

.body {
	flex: 1 1 auto;
	overflow: hidden;
	text-overflow: ellipsis;
}

.itemTitle {
	display: block;
	font-weight: bold;
}

.itemDescription {
	opacity: 0.6;
	display: block;
	line-height: 1.5;
}

.toggle {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	width: 16px;
	top: 0;
	bottom: 0;
	margin-top: auto;
	margin-bottom: auto;
}
</style>
