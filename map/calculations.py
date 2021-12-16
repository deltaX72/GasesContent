import datetime
import math
import time as tm
import os

from gasescontent.constants import MINIMAL_CO2_CONTENT
from map.models import GOSATData


month_degree = 2.5


def delta(left, right):
    return abs(left - right)


def sqr_delta(value):
    return value ** 2


def find_points_around(latitude, longitude, minimal_date, maximal_date, radius: float):
    return GOSATData.data.filter(
        latitude__gte=latitude - radius,
        latitude__lte=latitude + radius,
        longitude__gte=longitude - radius,
        longitude__lte=longitude + radius,
        time__gte=minimal_date,
        time__lte=maximal_date
    )


def find_distance(point1, point2):
    return math.sqrt(
        math.pow(delta(point1["data"]["latitude"], point2["data"]["latitude"]), 2) +
        math.pow(delta(point1["data"]["longitude"], point2["data"]["longitude"]), 2) +
        math.pow(delta(point1["data"]["time"], point2["data"]["time"]) / 2500000.0, 2)
    )


def find_nearest_point(target, data):
    min_point = {
        "point_id": -1,
        "data": {
            "latitude": 10000.0,
            "longitude": 10000.0,
            "time": 1000000000000
        }
    }
    for i in data:
        if i["data"]["latitude"] == target["data"]["latitude"] and \
                i["data"]["longitude"] == target["data"]["longitude"] and \
                i["data"]["time"] == target["data"]["time"]:
            continue
        target_i_distance = find_distance(target["data"], i["data"])
        target_min_point = find_distance(target["data"], min_point["data"])

        if delta(target_i_distance, target_min_point) < 0.05:
            continue
        if target_i_distance < target_min_point:
            min_point = i
    if min_point["point_id"] == -1:
        return None
    return min_point


def sorted_by_distance(data):
    points = []
    for i in data:
        point = find_nearest_point(i, data)
        if point is None:
            continue
        points.append(point)
    print(points)


def idw(pixel_center, points, options):
    top_sum = 0.0
    bottom_sum = 0.0
    exp = options["exp"]

    for i in points:
        inverted_distance_exp = math.pow(find_distance(pixel_center, i), -exp)
        top_sum += i["data"]["gas_content"] * inverted_distance_exp
        bottom_sum += inverted_distance_exp

    try:
        return top_sum / bottom_sum
    except ZeroDivisionError:
        return MINIMAL_CO2_CONTENT


def get_data_from_query_set(query_set):
    points = []

    counter = 0
    for i in query_set:
        points.append({
            "point_id": counter,
            "data": {
                "latitude": i.latitude,
                "longitude": i.longitude,
                "time": i.time
            }
        })
        counter += 1
    return points


def get_time(time1, time2, distance):
    return time1 + abs(time2 - time1) / distance


def get_month_data(input_data):
    # ================================================================== world
    area_size: float = 2.5

    latitudes_area_delta = input_data["maximal_latitude"] - input_data["minimal_latitude"]
    longitudes_area_delta = input_data["maximal_longitude"] - input_data["minimal_longitude"]

    y_area_count = int(latitudes_area_delta / area_size)
    x_area_count = int(longitudes_area_delta / area_size)

    # ================================================================== map
    pixel_size = input_data["pixel_size"]

    y_pixel_delta = input_data["screen"]["top"] - input_data["screen"]["bottom"]
    x_pixel_delta = input_data["screen"]["right"] - input_data["screen"]["left"]

    y_pixel_count = int(y_pixel_delta / pixel_size)
    x_pixel_count = int(x_pixel_delta / pixel_size)

    print(y_pixel_count)
    print(x_pixel_count)

    # ==================================================================
    latitude_per_pixel = latitudes_area_delta / y_pixel_delta
    longitude_per_pixel = longitudes_area_delta / x_pixel_delta

    y_array = []

    total_counter = 0
    counter = 0
    for y_cell in range(y_pixel_count):
        x_array = []
        points_array = []
        for x_cell in range(x_pixel_count):
            query_set = GOSATData.data.filter(
                latitude__gte=input_data["maximal_latitude"] - (y_cell + 1) * latitude_per_pixel - area_size / 2,
                latitude__lte=input_data["maximal_latitude"] - y_cell * latitude_per_pixel + area_size / 2,
                longitude__gte=input_data["minimal_longitude"] + x_cell * longitude_per_pixel - area_size / 2,
                longitude__lte=input_data["minimal_longitude"] + (x_cell + 1) * longitude_per_pixel + area_size / 2,
                time__gte=input_data["minimal_date"],
                time__lte=input_data["maximal_date"]
            )
            for i in query_set:
                points_array.append({
                    "point_id": total_counter,
                    "data": {
                        "latitude": i.latitude,
                        "longitude": i.longitude,
                        "gas_content": i.gas_content,
                        "time": i.time
                    }
                })
                total_counter += 1
            point = {
                "point_id": counter,
                "data": {
                    "latitude": input_data["maximal_latitude"] - y_cell * latitude_per_pixel * pixel_size,
                    "longitude": input_data["minimal_longitude"] + x_cell * longitude_per_pixel * pixel_size,
                    "time": input_data["minimal_date"],
                }
            }
            point["data"]["gases_content"] = idw(point, points_array, {
                "exp": 2
            })

            counter += 1
            x_array.append(point)
        print(x_array)
        y_array.append(x_array)


def get_seconds_from_date(year, month, day, hour=0, minute=0, second=0):
    dt = datetime.datetime(year, month, day, hour, minute, second)
    return tm.mktime(dt.timetuple())


def run():
    input_data = {
        "minimal_latitude": -20,
        "maximal_latitude": 20,
        "minimal_longitude": -20,
        "maximal_longitude": 20,
        "minimal_date": get_seconds_from_date(2014, 4, 1),
        "maximal_date": get_seconds_from_date(2014, 5, 1),
        "pixel_size": 8,

        "screen": {
            "top": 821,
            "bottom": 0,
            "left": 0,
            "right": 1440
        }
    }

    get_month_data(input_data)
