package main

import (
	"fmt"
	"os"
	"time"

	"github.com/evanw/esbuild/pkg/api"
)

func main() {
	startBuildTime := time.Now()

	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{"./src/index.ts"},
		Bundle:            true,
		Platform:          api.PlatformNode,
		External:          []string{"pg-native"}, // since this causing error external pkg
		Outfile:           "./dist/index.js",
		LogLevel:          api.LogLevelError,
		Sourcemap:         api.SourceMapLinked,
		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		Loader: map[string]api.Loader{
			".ts": api.LoaderTS,
		},
		Engines: []api.Engine{
			{Name: api.EngineNode, Version: "12.0"},
		},
		Write: true,
	})
	if len(result.Errors) > 0 {
		fmt.Printf("Error %v\n", result.Errors)
		os.Exit(1)
	}

	elapsedTime := time.Since(startBuildTime)
	fmt.Printf("%s took %v!\n", "Build success and", elapsedTime)
	os.Exit(0)
}
