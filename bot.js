const TODOIST_API_ENDPOINT = 'https://api.todoist.com/rest/v1'

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'

const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`


// sync LeetCode daily coding challenge to Todoist
const syncLeetCodeCodingChallenge = async (event) => {
    const question = await fetchDailyCodingChallenge()
    await createTodoistTask(question)
}

// fetch leetcode daily
const fetchDailyCodingChallenge = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`)

    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
    }

    const response = await fetch(LEETCODE_API_ENDPOINT, init)
    return response.json()
}
// create todoist task
const createTodoistTask = async (question) => {
    const questionInfo = question.data.activeDailyCodingChallengeQuestion

    const questionTitle = questionInfo.question.title
    const questionDifficulty = questionInfo.question.difficulty
    const questionLink = `https://leetcode.com${questionInfo.link}`

    console.log(`Creating Todoist task with title ${questionTitle}.`)

    const body = {
        content: `[${questionTitle}](${questionLink})`,
        description: `Difficulty: ${questionDifficulty}`,
        due_string: 'Today',
        priority: 4,
    }

    const init = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TODOIST_API_TOKEN}`,
        },
    }

    const response = await fetch(`${TODOIST_API_ENDPOINT}/tasks`, init)
    return response.json()
}
// wrangler worker handles this
addEventListener('scheduled', (event) => {
    event.waitUntil(syncLeetCodeCodingChallenge(event))
})
