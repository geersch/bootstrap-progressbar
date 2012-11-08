# Multi-Color Progressbar for Twitter Bootstrap

![Progressbar Example](https://dl.dropbox.com/u/40603470/bootstrap-progressbar/bar.png)

Multi-Color progressbar component for Twitter Bootstrap creates a progressbar which consists out of three colors.

* Green (bar-success)
* Orange (bar-warning)
* Red (bar-danger)

The progressbar consists out of three zones. Safe, warning and danger. The safe zone is displayed in green, the warning 
zone in orange and red is used for the danger zone.

By default the following percentages are used for the zones:

* Green (0 - 50%)
* Warning (50 - 90%)
* Danger (90 - 100%)

The progressbar automatically changes the color depending on its position.

## Usage

This component relies on [Twitter Bootstrap](http://twitter.github.com/bootstrap/) and [jQuery](http://jquery.com/).

Basic usage:

```
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="bootstrap.js"></script>
<link rel="stylesheet" type="text/css" href="bootstrap.css" />

<div id="progressbar">
</div>

<script type="text/javascript">
$('#progressbar').progressbar();
</script>
```

You can use the following additional options to modify the behaviour of the progressbar:

* **warningMarker**: Percentage at which the warning zone starts (default 50%).
* **dangerMarker**: Percentage at which the danger zone starts (default 90%).
* **maximum**: Maximum value which equals 100%.
* **step**: The amount that each completed task in an operation changes the value of the progress bar.

For example:

```
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="bootstrap.js"></script>
<link rel="stylesheet" type="text/css" href="bootstrap.css" />

<div id="progressbar">
</div>

<script type="text/javascript">
$('#progressbar').progressbar({
    warningMarker: 60,
    dangerMarker: 80,
    maximum: 100,
    step: 5
});
</script>
```

## Methods

**stepIt**

Increases the position of the progressbar with the value its step property.

```
$('#progressbar').('stepIt');
```

**setWarningMarker**

Set the position, expressed in percentage, of the warning marker.

```
$('#progressbar').('setWarningMarker', 50);
```

**setDangerMarker**

Set the position, expressed in percentage, of the danger marker.

```
$('#progressbar').('setDangerMarker', 90);
```

**setStep**

Set the step, by which the position of the progressbar is increased each time the stepIt() method is called.

```
$('#progressbar').('setStep', 10);
```

**setMaximum**

Set the maximum allowed value of the progressbar.

```
$('#progressbar').('setMaximum', 85);
```

**setPosition**

Set the current position of the progressbar. Must be less or equal to the maximum.

```
$('#progressbar').('setPosition', 85);
```

**reset**

Resets the progressbar back to position 0.

```
$('#progressbar').('reset');
```

## Events

The progressbar supports one event, namely **positionChanged**. This event is triggered when its position changes.

The event objects has two additional properties:

* **position**: Current position of the progressbar.
* **percent**: Current position of the progressbar expressed in percentage.

```
$('#progressbar').on("positionChanged", function (e) {
    console.log(e.position);
    console.log(e.percent);
});
```

## License