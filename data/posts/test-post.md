---
title: "Building a Live Service Turn Based Strategy Game - Part 1: Learning Unreal Engine"
category: "Game Development"
date: "2026-01-10"
---

## Introduction

Thanksgiving 2024 I was talking with my cousin about an old web game we both played called _Tactics Arena: Online_. We remembered it as being one of its kind, and to this point it was even brought back to life. It was rewritten in javascript, [open sourced](https://github.com/pongstylin/tactics) and is currently being hosted using the original assets at [tactics.taorankings.com](https://tactics.taorankings.com/). This inspired me to learn how to recreate this awesome experience in a modern 3D world.

## Scope

This is a massive scope which could take years to complete. I had very little knowledge of game development at the time, but I was interested in learning. In the next series of posts I will cover the progress I have made up to this point. It will include:

- The game "portal" with a UI for players to authenticate, chat and queue for matches
- The game world with controls for moving units on a game board and Heads-Up Display (HUD) that has basic functionality
- Leveraging [Amazon GameLift](https://aws.amazon.com/gamelift/) for running and managing dedicated game servers.
- Custom Web API server to power client auth, chat and matchmaking using [FlexMatch](https://docs.aws.amazon.com/gameliftservers/latest/flexmatchguide/match-intro.html).

By doing these things, I have a fully functional multiplayer game for which I can continue adding gameplay mechanics to such as rules, combat and abilities. I also have a path for building other functionality into the portal UI such as Collections and Store pages.

## Getting Started

The most obvious place to start was with a game engine. I didn't want to get into the details of building an engine myself. I also did not have time to spend learning to become a proper artist. For those reasons I chose [Unreal Engine](https://www.unrealengine.com/en-US). It has a large [marketplace](https://www.fab.com/), good community support and very importantly you gain access to the [free paragon content](https://www.unrealengine.com/en-US/paragon) made available by using the engine. The plan was to use these free character assets and whatever I could find from the marketplace to build something I hoped would resemble TAO.

## Learning UE5

I had only a basic understanding of world building at the time and this project required gameplay mechanics, networking and UI development. On top of that I had never written a line of C++ code. For that reason I sought to give myself some structure by following some courses by [Stephen Ulibarri](https://www.udemy.com/user/stephen-ulibarri-3/) which proved helpful in understanding core concepts.

### Development Editor

Becoming familiar with the development editor is a good first step in understanding UE5. This is where you can create maps, add objects to your world, configure project settings, manage content for the game such as character models or blueprints, package your game and much more. For the scope of the project this far, these were the core concepts I needed to understand:

- [Textures](https://dev.epicgames.com/documentation/en-us/unreal-engine/textures-in-unreal-engine)
- [Materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-materials)
- [Lighting](https://dev.epicgames.com/documentation/en-us/unreal-engine/lighting-the-environment-in-unreal-engine)
- [Static Mesh](https://dev.epicgames.com/documentation/en-us/unreal-engine/static-meshes)
- [Skeletal Mesh](https://dev.epicgames.com/documentation/en-us/unreal-engine/skeletal-mesh-actors-in-unreal-engine)
- [Animation Sequence](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-sequences-in-unreal-engine)
- [Animation Blueprint](https://dev.epicgames.com/documentation/en-us/unreal-engine/animation-blueprints-in-unreal-engine)
- [Widget Blueprint](https://dev.epicgames.com/documentation/en-us/unreal-engine/widget-blueprints-in-umg-for-unreal-engine)
- [HUD](https://dev.epicgames.com/documentation/en-us/unreal-engine/user-interfaces-and-huds-in-unreal-engine)

Using Textures, Materials, Lighting and Static Meshes I can create a simple world with a gameboard. With Skeletal Meshes and Animation Blueprints/Sequences I can add player units into the world that have support for movement animations. With Widget Blueprints and a HUD I can build a UI for the game.

### C++ Framework

Unreal Engine is a large C++ framework which includes a number of classes that are able to be extended. Understanding their behavior, properties and life cycles was crucial to making any real progress since they were the foundation for my game. While there are many other classes, these were the ones I found to be the most important to understand:

- [UObject](https://dev.epicgames.com/documentation/en-us/unreal-engine/objects-in-unreal-engine)
- [AActor](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/AActor)
- [UActorComponent](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/UActorComponent)
- [APawn](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/APawn)
- [APlayerController](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/APlayerController)
- [APlayerState](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/APlayerState)
- [APlayerStart](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/APlayerStart)
- [UAnimInstance](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/UAnimInstance)
- [UUserWidget](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/UMG/UUserWidget)
- [AHUD](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/AHUD)
- [AGameState](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/AGameState)
- [AGameMode](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/AGameMode)
- [UGameInstance](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/UGameInstance)
- [UGameInstanceSubsystem](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/UGameInstanceSubsystem)

Here is an example of extending the `AActor` class by adding a Static Mesh and overriding the constructor and `BeginPlay()` method - much like what I will do later on in a custom `Tile` class.

<details open>
<summary>MyCustomActor.h</summary>

```cpp
#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MyCustomActor.generated.h"


UCLASS()
class YOURPROJECT_API AMyCustomActor : public AActor
{
GENERATED_BODY()


    public:
        // Constructor
        AMyCustomActor();


    protected:
        // Called when the game starts or when spawned
        virtual void BeginPlay() override;


    public:
        UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
        UStaticMeshComponent* MeshComponent;


}
```

</details>

<details open>
<summary>MyCustomActor.cpp</summary>

```cpp
#include "MyCustomActor.h"
#include "Components/StaticMeshComponent.h"
#include "Engine/Engine.h"


AMyCustomActor::AMyCustomActor()
{
    // Create root component
    MeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("MeshComponent"));
    RootComponent = MeshComponent;
}


void AMyCustomActor::BeginPlay()
{
    Super::BeginPlay();
    // Add logic here for BeginPlay lifecycle method
}
```

</details>

Notice the `UCLASS` and `UPROPERTY` macros. These are used for exposing the class and its properties to Unreal's [reflection](https://dev.epicgames.com/documentation/en-us/unreal-engine/reflection-system-in-unreal-engine) system. This allows me to create a blueprint from the `MyCustomActor` class and set the value of `MeshComponent` in the editor.

### Blueprints

Unreal has a Blueprint system which allows you to extend functionality of engine or custom C++ classes inside of an event graph in the editor rather than through code. Each Blueprint has a parent class from which it derives. They give us access to things like [Unreal Motion Graphics (UMG)](https://dev.epicgames.com/documentation/en-us/unreal-engine/creating-user-interfaces-with-umg-and-slate-in-unreal-engine) editor through Widget Blueprints, and [Anim Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine) through Animation Blueprints, which are important for this project. They can also be used to set the value of class properties. This is what an Actor Blueprint event graph looks like:

![Unreal Engine Blueprint Event Graph](/img/blueprint-event-graph.png)

As you can see it reflects the AActor class lifecycle methods like `BeginPlay()`

### Networking

Networking in UE5 was my biggest challenge but also my most important goal. There are different models you can use for building multiplayer games such as the [Listen Server](https://en.wikipedia.org/wiki/Game_server#Listen_server) model and [Dedicated Server](https://en.wikipedia.org/wiki/Game_server#Dedicated_server) model, both of which UE5 supports. For this project I would choose to use a Dedicated Server model. At a high level this is how it works: I can run a server build of my game and different clients (players) can connect to that server and play matches. Clients will make [Remote Procedure Calls (RPC)](https://dev.epicgames.com/documentation/en-us/unreal-engine/remote-procedure-calls-in-unreal-engine) to the server when performing actions like moving a unit on the board. The server will validate the action by checking if the move is legal and if so start moving the unit. Finally it will replicate the unit's new position to all connected clients using the built-in [Replication](https://dev.epicgames.com/documentation/en-us/unreal-engine/networking-and-multiplayer-in-unreal-engine) system. Of course, you need a way of running and managing server instances of the game. For that I am leveraging Amazon Gamelift and FlexMatch through a custom web API server.
