<template>
	<q-page class="q-py-md">
		<div class="row" style="width: 100%;">
			<div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-8 col-sm-10 col-12 q-pa-sm">
				<div class="row" style="width: 100%;">
					<div class="col-md-12 col-12">
						<div class="box">
							<div class="row">
								<div class="col-md-12 col-12">
									<div class="q-pa-md">
										<div class="widget">
											<div class="widget-title flex align-center justify-between">
												<h6>My Academic Doubts</h6>
												<q-btn color="primary" @click="redirectRaiseTicket" label="Ask Doubt" />
											</div>
										</div>
										<q-card flat>
											<q-tabs class="justify-between tabsss" v-model="tab" dense
												indicator-color="transparent" align="justify" narrow-indicator>
												<q-tab name="active-tickets" class="tab-box">
													<div class="count blue">{{ ticket.activeTickets.length }}</div>
													<div class="count-title blue">Active Queries<span>Your total active
															queries</span></div>
												</q-tab>
												<q-tab name="action" class="tab-box">
													<div class="count red">{{ ticket.actionRequiredTickets.length }}
													</div>
													<div class="count-title red">Action Required<span>No queries
															Found</span></div>
												</q-tab>
												<q-tab name="closed" class="tab-box">
													<div class="count green">{{ ticket.closedTickets.length }}</div>
													<div class="count-title green">Closed Queries<span>Your closed
															queries list</span></div>
												</q-tab>
											</q-tabs>
											<q-separator />
											<q-tab-panels v-model="tab" animated>
												<q-tab-panel name="active-tickets">
													<div class="table-responsive">
														<table v-for="ticket in ticket.activeTickets" :key="ticket.id"
															v-bind="ticket" class="tickets-table table">
															<thead>
																<tr>
																	<td colspan="2" class="title-tkts text-left">{{
																			ticket.title
																	}}</td>
																	<td class="text-right"><a
																			@click="redirectTicketDetails(ticket.id)"
																			class="view-btn"><i class="fas fa-eye"></i>
																			View Details</a></td>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td><strong>Track ID</strong>: {{
																			ticket.ticket_track_id
																	}}</td>
																	<td v-if="ticket.status == 'N'"><strong>Current
																			Status</strong>: New</td>
																	<td v-if="ticket.status == 'C'"><strong>Current
																			Status</strong>: Closed</td>
																	<td v-if="ticket.status == 'P'"><strong>Current
																			Status</strong>: In Progress</td>
																	<td v-if="ticket.status == 'R'"><strong>Current
																			Status</strong>: Re-Open</td>
																	<td v-if="ticket.status == 'A'"><strong>Current
																			Status</strong>: Action Required</td>
																	<td><strong>Opened Time</strong>: {{
																			ticket.opened_time
																	}}</td>
																</tr>
																<tr>
																	<!-- <td><strong>Ticket Category</strong>: Academics » Software Development</td> -->
																	<td><strong>Last Replied On</strong>: {{
																			ticket.last_reply_time
																	}}</td>
																</tr>

															</tbody>
														</table>
													</div>

												</q-tab-panel>
												<q-tab-panel name="action">
													<table v-for="ticket in ticket.actionRequiredTickets"
														:key="ticket.id" v-bind="ticket"
														class="tickets-table table-responsive table-responsive-sm table-responsive-md">
														<thead>
															<tr>
																<td colspan="2" class="title-tkts text-left">{{
																		ticket.title
																}}</td>
																<td class="text-right"><a
																		@click="redirectTicketDetails(ticket.id)"
																		class="view-btn"><i class="fas fa-eye"></i> View
																		Details</a></td>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td><strong>Track ID</strong>: {{ ticket.ticket_track_id
																}}</td>
																<td v-if="ticket.status == 'N'"><strong>Current
																		Status</strong>: New</td>
																<td v-if="ticket.status == 'C'"><strong>Current
																		Status</strong>: Closed</td>
																<td v-if="ticket.status == 'P'"><strong>Current
																		Status</strong>: In Progress</td>
																<td v-if="ticket.status == 'R'"><strong>Current
																		Status</strong>: Re-Open</td>
																<td v-if="ticket.status == 'A'"><strong>Current
																		Status</strong>: Action Required</td>
																<td><strong>Opened Time</strong>: {{ ticket.opened_time
																}}</td>
															</tr>
															<tr>
																<!-- <td><strong>Ticket Category</strong>: Academics » Software Development</td> -->
																<td><strong>Last Replied On</strong>: {{
																		ticket.last_reply_time
																}}</td>
															</tr>

														</tbody>
													</table>
												</q-tab-panel>
												<q-tab-panel name="closed">
													<table v-for="ticket in ticket.closedTickets" :key="ticket.id"
														v-bind="ticket"
														class="tickets-table table-responsive table-responsive-sm table-responsive-md">
														<thead>
															<tr>
																<td colspan="2" class="title-tkts text-left">{{
																		ticket.title
																}}</td>
																<td class="text-right"><a
																		@click="redirectTicketDetails(ticket.id)"
																		class="view-btn"><i class="fas fa-eye"></i> View
																		Details</a></td>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td><strong>Track ID</strong>: {{ ticket.ticket_track_id
																}}</td>
																<td v-if="ticket.status == 'N'"><strong>Current
																		Status</strong>: New</td>
																<td v-if="ticket.status == 'C'"><strong>Current
																		Status</strong>: Closed</td>
																<td v-if="ticket.status == 'P'"><strong>Current
																		Status</strong>: In Progress</td>
																<td v-if="ticket.status == 'R'"><strong>Current
																		Status</strong>: Re-Open</td>
																<td v-if="ticket.status == 'A'"><strong>Current
																		Status</strong>: Action Required</td>
																<td><strong>Opened Time</strong>: {{ ticket.opened_time
																}}</td>
															</tr>
															<tr>
																<!-- <td><strong>Ticket Category</strong>: Academics » Software Development</td> -->
																<td><strong>Last Replied On</strong>: {{
																		ticket.last_reply_time
																}}</td>
															</tr>

														</tbody>
													</table>
												</q-tab-panel>
											</q-tab-panels>
										</q-card>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup>
import { LocalStorage } from 'quasar';
import { formApi } from 'src/boot/axios';
import { onBeforeMount, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tab = ref('active-tickets')
const innerTab = ref('inneractive-tickets')
const splitterModel = ref(20)

// const ticket = reactive(
//   {
//     title: 'Java',
//     ticket_track_id: 'TB0B6EFEE-003-YPQ',
//     current_status: 'New',
//     opened_time: 'Oct 27, 2022 05:57 PM',
//     ticket_category: 'Academics » Software Development',
//     last_replied_on: 'Oct 27, 2022 05:57 PM'
//   },
//   {
//     title: 'Python',
//     ticket_track_id: 'TB0B6EFEE-003-YPQ',
//     current_status: 'In Progress',
//     opened_time: 'Oct 28, 2022 12:00 PM',
//     ticket_category: 'Academics » Software Development',
//     last_replied_on: 'Oct 28, 2022 01:30 PM'
//   },
// )

const ticket = reactive({
	activeTickets: [],
	actionRequiredTickets: [],
	closedTickets: []
})

onBeforeMount(() => {
	formApi.get('get-student-ticket', {
		params: {
			student_email: LocalStorage.getItem("email")
		}
	}).then((res) => {
		ticket.activeTickets = res.data.active
		ticket.actionRequiredTickets = res.data.action_required
		ticket.closedTickets = res.data.closed
	})
})

const redirectTicketDetails = (id) => {
	router.push('query-details/' + id)
}
const redirectRaiseTicket = () => {
	router.push('ask-doubt')
}
</script>

<style lang="scss" scoped>
.box {
	background-color: #ffffff;
	border-radius: 8px;
	overflow: hidden;

	h5 {
		margin: 0px;
		color: #fff;
		text-align: center;
	}

	.title {
		background-color: #00ccf2;
		padding: 10px;
	}

	h6 {
		margin: 0px;
	}

	.tab-box {
		height: 150px;
		width: 30%;
		margin: 2%;
		border: 1px solid rgba(0, 0, 0, .125);

		.count {
			font-size: 45px;
			font-weight: 500;
			line-height: 50px;
		}

		.count-title {
			font-size: 15px;
			font-weight: 500;

			span {
				display: block;
				font-size: 10px;
			}
		}

		.blue {
			color: #0d90b8;
		}

		.red {
			color: #b30a20;
		}

		.green {
			color: #17b82c;
		}
	}

	.tickets-table {
		border: 1px solid $primary;
		border-radius: 10px;
		border-spacing: 0px;
		padding-bottom: 10px;
		margin-bottom: 20px;
		width: 100%;

		thead {
			tr {
				td {
					font-size: 18px;
					border-bottom: 1px solid rgba(0, 0, 0, 0.3);
					padding: 10px 15px;

					.view-btn {
						cursor: pointer;
						text-decoration: none;
						background-color: $primary;
						padding: 3px 8px;
						color: #fff;
						border-radius: 15px;
						font-size: 12px;
					}
				}

				.title-tkts {
					font-size: 16px;
					font-weight: 600;
					color: $primary;
				}
			}
		}

		tbody {
			tr {
				td {
					padding: 4px 15px;
					font-size: 13px;
					color: #2e2e2e;
				}
			}
		}
	}
}

.widget {
	padding: 20px;

	.widget-title {
		h6 {
			font-weight: 700;
			font-size: 24px;
			color: #3f3f3f;
			letter-spacing: 0px;
		}
	}

	.scroll {
		background-color: rgba(40, 36, 100);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 100%;
		position: absolute;
		right: 0;
		top: 50%;
		color: #fff;
	}

	.scroll2 {
		background-color: rgba(40, 36, 100);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 100%;
		position: absolute;
		left: 0;
		top: 50%;
		color: #fff;
	}

	.widget-container {
		padding: 20px;
		margin-top: 20px;
		border-radius: 8px;
		width: 100%;
		white-space: nowrap;
		position: relative;
	}
}

.pro-box {
	background-color: rgb(205, 240, 234);
}

@media (max-width:767px) {
	.row {
		display: block;
	}

	.widget {
		padding: 5px;

		.widget-title {
			h6 {
				margin-bottom: 18px;
			}
			.q-btn{
				margin-bottom: 15px;
			}
		}

		.widget-container {
			padding: 0px;
		}
	}

	.box {
		.tab-box {
			width: 100%;
			height: 135px;

			.count {
				font-size: 30px;
			}
		}

		.tickets-table {
			overflow: auto;
			width: 100%;

			thead {
				tr {
					td {
						font-size: 10px;
						padding: 5px 6px 5px 0;

						.view-btn {
							padding: 3px 5px;
							font-size: 8px;
							display: block;
							text-align: center;
						}
					}

					.title-tkts {
						font-size: 14px;
						padding-left: 10px;
					}
				}
			}

			tbody {
				tr {
					td {
						padding: 4px 6px;
						font-size: 10px;
						color: #2e2e2e;
					}
				}
			}
		}

		.q-tab-panel {
			padding: 12px 0;
		}
	}
}
</style>
