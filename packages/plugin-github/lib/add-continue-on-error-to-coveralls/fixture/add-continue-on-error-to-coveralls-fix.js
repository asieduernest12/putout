__putout_processor_yaml({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions/checkout@v3"
            }, {
                "name": "Use Node.js ${{ matrix.node-version }}",
                "uses": "actions/setup-node@v1",
                "with": {
                    "node-version": "${{ matrix.node-version }}"
                }
            }, {
                "name": "Coveralls",
                "uses": "coverallsapp/github-action@v2",
                "continue-on-error": true,
                "with": {
                    "github-token": "${{ secrets.GITHUB_TOKEN }}"
                }
            }]
        }
    }
});
